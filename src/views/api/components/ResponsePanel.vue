<template>
    <n-collapse :default-expanded-names="expanded" accordion>
        <n-collapse-item name="response" title="响应">
            <n-card class="min-height">
                <n-config-provider :hljs="Highlight">
                    <!-- TODO: 临时, 应使用动态最大高度 -->
                    <n-scrollbar style="max-height: 400px">
                        <n-code :code="code" language="json" word-wrap />
                    </n-scrollbar>
                </n-config-provider>
            </n-card>
        </n-collapse-item>
    </n-collapse>
</template>

<script lang="ts" setup>
import Highlight from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import { computed, ref } from 'vue'

Highlight.registerLanguage('json', json)

defineOptions({ name: 'ResponsePanel' })
const props = defineProps<{
    value: any
}>()
const expanded = ref('response')
const code = computed(() => props.value ? JSON.stringify(props.value, null, 4) : '')
</script>

<style lang="sass" scoped>
.min-height
    min-height: 300px
</style>
