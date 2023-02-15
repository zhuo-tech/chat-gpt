<template>
    <!-- 描述信息和链接 -->
    <n-card>
        <n-button :href="body.link" tag="a" target="_blank" text type="primary">
            <h2>{{ body.title }}</h2>
        </n-button>
        <div>{{ body.desc }}</div>
    </n-card>

    <!-- 请求信息 -->
    <n-form>
        <n-form-item>
            <n-input-group>
                <n-select v-model:value="formData.method" :options="methodOption" class="method-select" />
                <n-input v-model:value="formData.url" :allow-input="noSideSpace" disabled placeholder="请求地址" />
                <n-button class="send-btn" ghost type="primary" @click="onSend">发送</n-button>
            </n-input-group>
        </n-form-item>
    </n-form>
    <n-tabs animated type="line">
        <!-- 请求体 -->
        <n-tab-pane name="body" tab="body">
            <div class="request-body">
                <n-input-group>
                    <n-select v-model:value="body.method" :options="bodyMethodOption" class="method-select" />
                    <n-input v-model:value="body.url" :allow-input="noSideSpace" placeholder="URL" />
                </n-input-group>
                <br><br>
                <n-input v-model="body.body" :autosize="{minRows: 10, maxRows: 30}" placeholder="请求体 JSON" type="textarea" />
            </div>
        </n-tab-pane>
        <!-- 实际固定的请求头 -->
        <n-tab-pane name="header" tab="header">
            <div v-for="i in headers" :key="i.label" class="header-line">
                <n-input v-model:value="i.label" :disabled="i.readonly" class="key" />
                <n-input v-model:value="i.value" :disabled="i.readonly" type="text" />
            </div>
        </n-tab-pane>
    </n-tabs>
</template>

<script lang="ts" setup>
import { HttpMethod } from '@/views/api/Constant'
import { OpenAiApi, ProxyApi } from '@/views/api/openAI'
import { toOption } from '@/views/api/Tools'
import { AxiosRequestConfig } from 'axios'
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'RequestPanel' })

const props = defineProps<{ formData?: ProxyApi }>()
const emit = defineEmits<{
    (event: 'send', value: AxiosRequestConfig): void
    (event: 'update:formData', value: any): void
}>()

const methodOption = toOption(HttpMethod).map(i => ({
    ...i,
    disabled: i.label !== 'POST',
}))
const bodyMethodOption = toOption(HttpMethod)

const formData = ref<ProxyApi<OpenAiApi>>({} as any)

const headers = computed<Array<{ label: string, value: string, readonly: boolean }>>(
    () => toOption(formData.value?.header ?? {}).map(i => ({ ...i, readonly: true } as any)),
)

const body = computed<OpenAiApi>({
    get() {
        return formData.value.body ?? {} as OpenAiApi
    },
    set(value: OpenAiApi) {
        formData.value.body = value
    },
})

const noSideSpace = (value: string) => !value.startsWith(' ') && !value.endsWith(' ')

const onSend = () => {
    const config = formData.value
    const { body } = formData.value

    const data = body
        ? {
            url: body.url,
            method: body.method,
            body: body.body,
        }
        : undefined

    emit('send', {
        url: config.url,
        method: config.method,
        headers: config.header,
        data: data,
    })
}

watch(
    () => props.formData,
    () => {
        if (props.formData) {
            formData.value = props.formData
        }
    },
    { immediate: true },
)
watch(
    () => formData.value,
    () => emit('update:formData', formData.value),
    { deep: true },
)
</script>

<style lang="sass" scoped>
.method-select
    width: 120px

.send-btn
    width: 150px

.header-line
    display: flex
    align-items: center
    width: 100%

    .key
        margin-right: 12px
        width: 300px

.request-body
    max-width: 1200px

    .method-select
        width: 120px


</style>
