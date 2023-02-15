<template>
    <n-card>
        <div class="api-debug-wrapper">
            <n-spin :show="loading">
                <RequestPanel v-model:form-data="request" @send="onSendRequest" />
            </n-spin>
            <!-- 响应面板 -->
            <ResponsePanel :value="response" />
        </div>
    </n-card>
</template>

<script lang="ts" setup>
import { OpenAIApi } from '@/service'
import { openAIProxy } from '@/service/api/CloudFun'
import { StandardErrorProcessor } from '@/service/request'
import { getToken } from '@/store/modules/auth/helpers'
import RequestPanel from '@/views/api/components/RequestPanel.vue'
import ResponsePanel from '@/views/api/components/ResponsePanel.vue'
import { proxyApi, ProxyApi } from '@/views/api/openAI'
import { AxiosRequestConfig } from 'axios'
import { ref } from 'vue'

defineOptions({ name: 'ApiDebugPage' })

const token = getToken()
proxyApi.header['Authorization'] = token

const props = withDefaults(
    defineProps<{ proxyApi?: ProxyApi, openAIApi: OpenAIApi }>(),
    { proxyApi: proxyApi as any },
)

const copy = Object.assign({}, props.proxyApi)
copy.body = props.openAIApi

const request = ref(copy)
const loading = ref(false)
const response = ref({})

const onSendRequest = (value: AxiosRequestConfig) => {
    loading.value = true
    openAIProxy(value.data)
        .then(res => {
            response.value = res as any
        })
        .catch(StandardErrorProcessor)
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
