<template>
    <div
        :class="{ 'p-16px': showPadding }"
        class="h-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out"
    >
        <router-view v-slot="{ Component, route }">
            <transition :appear="true" :name="theme.pageAnimateMode" mode="out-in">
                <keep-alive>
                    <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store'

defineOptions({ name: 'GlobalContent' })

interface Props {
    /** 显示padding */
    showPadding?: boolean;
}

withDefaults(defineProps<Props>(), {
    showPadding: true,
})

const app = useAppStore()
const theme = useThemeStore()
</script>

<style scoped></style>
