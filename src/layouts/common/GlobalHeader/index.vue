<template>
    <dark-mode-container :inverted="theme.header.inverted" class="global-header flex-y-center h-full">
        <global-logo v-if="showLogo" :show-title="true" :style="{ width: theme.sider.width + 'px' }" class="h-full" />
        <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
            <menu-collapse v-if="showMenuCollapse || isMobile" />
            <global-breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
        </div>
        <header-menu v-else />
        <div class="flex justify-end h-full">
            <full-screen />
            <theme-mode />
            <system-message />
            <setting-button v-if="showButton" />
            <user-avatar  />
        </div>
    </dark-mode-container>
</template>

<script lang="ts" setup>
import { PROD, VITE_VERCEL } from '@/config'
import { useThemeStore } from '@/store'
import { useBasicLayout } from '@/composables'
import GlobalLogo from '../GlobalLogo/index.vue'
import {
    FullScreen,
    GlobalBreadcrumb,
    HeaderMenu,
    MenuCollapse,
    SettingButton,
    SystemMessage,
    ThemeMode,
    UserAvatar,
} from './components'

defineOptions({ name: 'GlobalHeader' })

interface Props {
    /** 显示logo */
    showLogo: App.GlobalHeaderProps['showLogo'];
    /** 显示头部菜单 */
    showHeaderMenu: App.GlobalHeaderProps['showHeaderMenu'];
    /** 显示菜单折叠按钮 */
    showMenuCollapse: App.GlobalHeaderProps['showMenuCollapse'];
}

defineProps<Props>()

const theme = useThemeStore()
const { isMobile } = useBasicLayout()

const showButton = PROD && VITE_VERCEL !== 'Y'
</script>

<style scoped>
.global-header {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}


</style>
