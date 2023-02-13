<template>
    <admin-layout
        :fixed-footer="theme.footer.fixed"
        :fixed-header-and-tab="theme.fixedHeaderAndTab"
        :footer-visible="theme.footer.visible"
        :header-height="theme.header.height"
        :is-mobile="isMobile"
        :mode="mode"
        :sider-collapse="app.siderCollapse"
        :sider-collapsed-width="siderCollapsedWidth"
        :sider-visible="siderVisible"
        :sider-width="siderWidth"
        :tab-height="theme.tab.height"
        :tab-visible="theme.tab.visible"
        @update:sider-collapse="app.setSiderCollapse"
    >
        <template #header>
            <global-header v-bind="headerProps" />
        </template>
        <template #tab>
            <global-tab />
        </template>
        <template #sider>
            <global-sider />
        </template>
        <global-content />
        <template #footer>
            <global-footer />
        </template>
    </admin-layout>
    <global-back-top />
    <setting-drawer />
</template>

<script lang="ts" setup>
import AdminLayout from '@soybeanjs/vue-admin-layout'
import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composables'
import {
    GlobalBackTop,
    GlobalContent,
    GlobalFooter,
    GlobalHeader,
    GlobalSider,
    GlobalTab,
    SettingDrawer,
} from '../common'

defineOptions({ name: 'BasicLayout' })

const app = useAppStore()
const theme = useThemeStore()

const { mode, isMobile, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout()
</script>

<style scoped></style>
