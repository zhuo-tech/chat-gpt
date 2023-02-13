<template>
    <n-scrollbar class="flex-1-hidden">
        <n-menu
            :collapsed="app.siderCollapse"
            :collapsed-icon-size="22"
            :collapsed-width="theme.sider.collapsedWidth"
            :expanded-keys="expandedKeys"
            :indent="18"
            :inverted="theme.sider.inverted"
            :options="menus"
            :value="activeKey"
            @update:value="(key) => $router.push(key)"
            @update:expanded-keys="setExpandedKeys"
        />
    </n-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useAppStore, useThemeStore } from '@/store'
import { useIconRender } from '@/composables'
import { getActiveKeyPathsOfMenus } from '@/utils'
import { MenuRouter } from '@/router/routes'

defineOptions({ name: 'VerticalMenu' })

const route = useRoute()
const app = useAppStore()
const theme = useThemeStore()
const { iconRender } = useIconRender()

const expandedKeys = ref<string[]>([])
const setExpandedKeys = (keys: Array<string>) => expandedKeys.value = keys
const activeKey = computed(() => (route.path) as string)

const menus = MenuRouter.map(toMenuOption)

function toMenuOption(i: RouteRecordRaw): MenuOption {
    return {
        key: i.path,
        label: i.meta?.title,
        icon: iconRender({ localIcon: i.meta?.localIcon, icon: i.meta?.icon }),
        children: i.children?.map(toMenuOption),
    }
}

watch(
    () => route.name,
    () => {
        expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus)
    },
    { immediate: true },
)
</script>

<style scoped></style>
