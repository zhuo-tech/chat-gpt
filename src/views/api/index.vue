<template>
    <n-card>
        <div class="api-debug-wrapper">
            <n-spin :show="loading">
                <RequestPanel
                    v-model:form-data="request"
                    :has-body="!!openAIApi.body"
                    @send="onSendRequest"
                />
            </n-spin>

            <!-- 响应面板 -->
            <ResponsePanel :value="response">
                <n-alert v-show="errMsg" type="error">
                    <div>{{ errMsg }}</div>
                </n-alert>
            </ResponsePanel>
        </div>
    </n-card>
</template>

<script lang="ts" setup>
import { openAIProxy } from '@/service/api/CloudFun'
import { StandardErrorProcessor } from '@/service/request'
import { getToken } from '@/store/modules/auth/helpers'
import RequestPanel from '@/views/api/components/RequestPanel.vue'
import ResponsePanel from '@/views/api/components/ResponsePanel.vue'
import { OpenAiApi, proxyApi, ProxyApi } from '@/views/api/openAI'
import { AxiosRequestConfig } from 'axios'
import { ref } from 'vue'

defineOptions({ name: 'ApiDebugPage' })

const token = getToken()
proxyApi.header['Authorization'] = token

const props = withDefaults(
    defineProps<{ proxyApi?: ProxyApi, openAIApi: OpenAiApi }>(),
    { proxyApi: proxyApi as any },
)

const copy = Object.assign({}, props.proxyApi)
copy.body = props.openAIApi

const request = ref(copy)
const loading = ref(false)
const response = ref(null)
const errMsg = ref('')

const onSendRequest = (value: AxiosRequestConfig) => {
    const data = value.data
    try {
        data.body = typeof data.body === 'string'
            ? JSON.parse(data.body)
            : data.body
    } catch (e) {
        console.debug('请求体解析出错: ', e)
        if (e instanceof Error) {
            window.$message?.warning('请求体格式错误 ' + e.message)
        }
        return
    }

    loading.value = true
    openAIProxy(data)
        .then(res => {
            response.value = res as any
            errMsg.value = ''
        })
        .catch(err => {
            if (err.msg) {
                errMsg.value = err.msg
            }
            StandardErrorProcessor(err)
        })
        .finally(() => loading.value = false)
}

</script>

<style lang="sass" scoped>
.api-debug-wrapper
    height: calc(100vh - 180px)

    display: flex
    flex-direction: column
    flex-wrap: nowrap
    align-items: stretch
    justify-content: space-between
</style>
