<template>
    <n-card>
        <div class="api-debug-wrapper">
            <div>
                <RequestPanel />
            </div>
            <!-- 响应面板 -->
            <ResponsePanel />
        </div>
    </n-card>
</template>

<script lang="ts" setup>

import RequestPanel from '@/views/api/components/RequestPanel.vue'
import ResponsePanel from '@/views/api/components/ResponsePanel.vue'

defineOptions({ name: 'ApiDebugPage' })

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
