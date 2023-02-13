<template>
    <hover-container
        :inverted="theme.header.inverted"
        class="w-40px h-full"
        tooltip-content="主题配置"
        @click="app.toggleSettingDrawerVisible"
    >
        <icon-ant-design-setting-outlined class="text-20px" />
    </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store'

defineOptions({ name: 'SettingButton' })

const app = useAppStore()
const theme = useThemeStore()
</script>

<style scoped></style>
