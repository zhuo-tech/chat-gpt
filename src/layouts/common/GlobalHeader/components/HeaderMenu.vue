<template>
    <div class="flex-1-hidden h-full px-10px">
        <n-scrollbar :x-scrollable="true" class="flex-1-hidden h-full" content-class="h-full">
            <div :style="{ justifyContent: theme.menu.horizontalPosition }" class="flex-y-center h-full">
                <n-menu
                    :inverted="theme.header.inverted"
                    :options="menus"
                    :value="activeKey"
                    mode="horizontal"
                    @update:value="handleUpdateMenu"
                />
            </div>
        </n-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useThemeStore } from '@/store'
import { useRouterPush } from '@/composables'

defineOptions({ name: 'HeaderMenu' })

const route = useRoute()
const theme = useThemeStore()
const { routerPush } = useRouterPush()

const menus = computed(() => [])
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string)

function handleUpdateMenu(_key: string, item: MenuOption) {
    const menuItem = item as App.GlobalMenuOption
    routerPush(menuItem.routePath)
}
</script>

<style scoped>
:deep(.n-menu-item-content-header) {
    overflow: inherit !important;
}
</style>
