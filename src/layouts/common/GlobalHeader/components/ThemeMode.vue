<template>
    <hover-container :inverted="theme.header.inverted" class="w-40px" tooltip-content="主题模式">
        <dark-mode-switch :dark="theme.darkMode" class="wh-full" @update:dark="theme.setDarkMode" />
    </hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'

defineOptions({ name: 'ThemeMode' })

const theme = useThemeStore()
</script>

<style scoped></style>
