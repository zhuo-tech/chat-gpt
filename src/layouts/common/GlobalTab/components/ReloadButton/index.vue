<template>
    <hover-container class="w-64px h-full" placement="bottom-end" tooltip-content="重新加载" @click="handleRefresh">
        <icon-mdi-refresh :class="{ 'animate-spin': loading }" class="text-22px" />
    </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { useLoading } from '@/hooks'

defineOptions({ name: 'ReloadButton' })

const app = useAppStore()
const { loading, startLoading, endLoading } = useLoading()

function handleRefresh() {
    startLoading()
    app.reloadPage()
    setTimeout(() => {
        endLoading()
    }, 1000)
}
</script>

<style scoped></style>
