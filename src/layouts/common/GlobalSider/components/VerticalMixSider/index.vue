<template>
    <dark-mode-container :inverted="theme.sider.inverted" class="flex h-full" @mouseleave="resetFirstDegreeMenus">
        <div class="flex-1 flex-col-stretch h-full">
            <global-logo :show-title="false" :style="{ height: theme.header.height + 'px' }" />
            <n-scrollbar class="flex-1-hidden">
                <mix-menu-detail
                    v-for="item in firstDegreeMenus"
                    :key="item.routeName"
                    :active-route-name="activeParentRouteName"
                    :icon="item.icon"
                    :is-mini="app.siderCollapse"
                    :label="item.label"
                    :route-name="item.routeName"
                    @click="handleMixMenu(item.routeName, item.hasChildren)"
                />
            </n-scrollbar>
            <mix-menu-collapse />
        </div>
        <mix-menu-drawer :menus="activeChildMenus" :visible="drawerVisible" />
    </dark-mode-container>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useThemeStore } from '@/store'
import { useRouterPush } from '@/composables'
import { useBoolean } from '@/hooks'
import { GlobalLogo } from '@/layouts/common'
import { MixMenuCollapse, MixMenuDetail, MixMenuDrawer } from './components'

defineOptions({ name: 'VerticalMixSider' })

const route = useRoute()
const app = useAppStore()
const theme = useThemeStore()
const { routerPush } = useRouterPush()
const { bool: drawerVisible, setTrue: openDrawer, setFalse: hideDrawer } = useBoolean()

const activeParentRouteName = ref('')

function setActiveParentRouteName(routeName: string) {
    activeParentRouteName.value = routeName
}

const firstDegreeMenus = computed(() => [] as any)

function getActiveParentRouteName() {
    firstDegreeMenus.value.some((item: any) => {
        const routeName = (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
        const flag = routeName?.includes(item.routeName)
        if (flag) {
            setActiveParentRouteName(item.routeName)
        }
        return flag
    })
}

function handleMixMenu(routeName: string, hasChildren: boolean) {
    setActiveParentRouteName(routeName)
    if (hasChildren) {
        openDrawer()
    } else {
        routerPush({ name: routeName })
    }
}

function resetFirstDegreeMenus() {
    getActiveParentRouteName()
    hideDrawer()
}

const activeChildMenus = computed(() => {
    const menus: App.GlobalMenuOption[] = []
    return menus
})

watch(
    () => route.name,
    () => {
        getActiveParentRouteName()
    },
    { immediate: true },
)
</script>

<style scoped></style>
