<template>
    <n-card>
        <div class="api-debug-wrapper">
            <div>
                <RequestPanel v-model:form-data="request" @send="onSendRequest" />
            </div>
            <!-- 响应面板 -->
            <ResponsePanel :value="response" />
        </div>
    </n-card>
</template>

<script lang="ts" setup>
import { OpenAIApi } from '@/service'
import RequestPanel from '@/views/api/components/RequestPanel.vue'
import ResponsePanel from '@/views/api/components/ResponsePanel.vue'
import { proxyApi, ProxyApi } from '@/views/api/openAI/AbstractApiInstance'
import { ref } from 'vue'

defineOptions({ name: 'ApiDebugPage' })

const props = withDefaults(
    defineProps<{ proxyApi?: ProxyApi, openAIApi: OpenAIApi }>(),
    { proxyApi: proxyApi as any },
)

const copy = Object.assign({}, props.proxyApi)
copy.body = props.openAIApi

const request = ref(copy)
const response = ref({})

const onSendRequest = () => {
    console.debug('发送请求', request.value)
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
