<template>
    <n-config-provider
        :date-locale="dateZhCN"
        :hljs="Highlight"
        :locale="zhCN"
        :theme="theme.naiveTheme"
        :theme-overrides="theme.naiveThemeOverrides"
        class="h-full"
    >
        <naive-provider>
            <router-view />
        </naive-provider>
    </n-config-provider>
</template>

<script lang="ts" setup>
import { useGlobalEvents } from '@/composables'
import { subscribeStore, useThemeStore } from '@/store'
import Highlight from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import http from 'highlight.js/lib/languages/json'
import { dateZhCN, zhCN } from 'naive-ui'

Highlight.registerLanguage('json', json)
Highlight.registerLanguage('http', http)

const theme = useThemeStore()

subscribeStore()
useGlobalEvents()
</script>

<style scoped></style>
