<template>
    <n-form>
        <n-form-item>
            <n-input-group>
                <n-select v-model:value="formData.method" :options="methodOption" style="width: 100px" />
                <n-input v-model:value="formData.url" :allow-input="noSideSpace" disabled placeholder="请求地址" />
                <n-button ghost style="width: 150px" type="primary" @click="() => emit('send')">发送</n-button>
            </n-input-group>
        </n-form-item>
    </n-form>
    <n-tabs animated type="line">
        <n-tab-pane name="body" tab="body">
            <div style="max-width: 1200px">
                <n-input-group>
                    <n-select v-model:value="formData.method" :options="methodOption" style="width: 100px" />
                    <n-input :allow-input="noSideSpace" :value="'/v1/image/create'" disabled placeholder="URL" />
                </n-input-group>
                <br><br>
                <br><br>
                <n-input placeholder="请求体 JSON" type="textarea">

                </n-input>
            </div>
        </n-tab-pane>
        <n-tab-pane name="header" tab="header">
            <n-table></n-table>

            <n-dynamic-input
                v-model:value="headers"
                :on-create="() => ({key: '', value: ''})"
                key-placeholder="请求头"
                preset="pair"
                style="max-width: 1200px"
            >
                <template #default="{ value }">
                    <div style="display: flex; align-items: center; width: 100%">
                        <n-input v-model:value="value['key']" :disabled="value['readonly']" style="margin-right: 12px; width: 300px" />
                        <n-input v-model:value="value['value']" :disabled="value['readonly']" type="text" />
                    </div>
                </template>
            </n-dynamic-input>
        </n-tab-pane>
    </n-tabs>
</template>

<script lang="ts" setup>

import { VITE_LAF_URL } from '@/config'
import { getToken } from '@/store/modules/auth/helpers'
import { ref } from 'vue'

defineOptions({ name: 'RequestPanel' })
const emit = defineEmits<{ (event: 'send'): void }>()

const formData = ref({
    method: 'POST',
    url: VITE_LAF_URL + 'open-ai',
    header: {},
    body: {},
})
const token = getToken()
const headers = ref([ { key: 'Authorization', value: token, readonly: true } ])

const methodOption = [
    { label: 'GET', value: 'GET', disabled: true },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT', disabled: true },
    { label: 'DELETE', value: 'DELETE', disabled: true },
]

const noSideSpace = (value: string) => !value.startsWith(' ') && !value.endsWith(' ')


</script>

<style lang="sass" scoped>
</style>
