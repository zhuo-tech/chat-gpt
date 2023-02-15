<template>
    <n-collapse :default-expanded-names="expanded" accordion>
        <n-collapse-item name="response" title="响应">
            <slot></slot>
            <n-card class="min-height">
                <!-- TODO: 临时, 应使用动态最大高度 -->
                <n-scrollbar style="max-height: 400px">
                    <n-code :code="code" language="json" word-wrap />
                </n-scrollbar>
            </n-card>
        </n-collapse-item>
    </n-collapse>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

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
