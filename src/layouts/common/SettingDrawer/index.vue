<template>
    <n-drawer :show="app.settingDrawerVisible" :width="330" display-directive="show" @mask-click="app.closeSettingDrawer">
        <n-drawer-content :native-scrollbar="false" title="主题配置">
            <dark-mode />
            <layout-mode />
            <theme-color-select />
            <page-func />
            <page-view />
            <theme-config />
        </n-drawer-content>
    </n-drawer>
    <drawer-button v-if="showButton" />
</template>

<script lang="ts" setup>
import { DEV, VITE_VERCEL } from '@/config'
import { useAppStore } from '@/store'
import { DarkMode, DrawerButton, LayoutMode, PageFunc, PageView, ThemeColorSelect, ThemeConfig } from './components'

defineOptions({ name: 'SettingDrawer' })

const app = useAppStore()

const showButton = DEV || VITE_VERCEL === 'Y'
</script>

<style scoped></style>
