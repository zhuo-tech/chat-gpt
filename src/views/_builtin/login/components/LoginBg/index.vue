<template>
    <div class="absolute-lt z-1 wh-full overflow-hidden">
        <div class="absolute -right-300px -top-900px <sm:(-right-100px -top-1170px)">
            <corner-top :end-color="darkColor" :start-color="lightColor" />
        </div>
        <div class="absolute -left-200px -bottom-400px <sm:(-left-100px -bottom-760px)">
            <corner-bottom :end-color="lightColor" :start-color="darkColor" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getColorPalette } from '@/utils'
import { CornerBottom, CornerTop } from './components'

interface Props {
    /** 主题颜色 */
    themeColor: string;
}

const props = defineProps<Props>()

const lightColor = computed(() => getColorPalette(props.themeColor, 3))
const darkColor = computed(() => getColorPalette(props.themeColor, 6))
</script>

<style scoped></style>
