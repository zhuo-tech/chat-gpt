<template>
    <n-grid :x-gap="16" :y-gap="16" cols="s:1 m:2 l:4" responsive="screen">
        <n-grid-item v-for="item in cardData" :key="item.id">
            <gradient-bg :end-color="item.colors[1]" :start-color="item.colors[0]" class="h-100px">
                <h3 class="text-16px">{{ item.title }}</h3>
                <div class="flex justify-between pt-12px">
                    <svg-icon :icon="item.icon" class="text-32px" />
                    <count-to
                        :end-value="item.value"
                        :prefix="item.unit"
                        :start-value="1"
                        class="text-30px text-white dark:text-dark"
                    />
                </div>
            </gradient-bg>
        </n-grid-item>
    </n-grid>
</template>

<script lang="ts" setup>
import { GradientBg } from './components'

defineOptions({ name: 'DashboardAnalysisDataCard' })

interface CardData {
    id: string;
    title: string;
    value: number;
    unit: string;
    colors: [ string, string ];
    icon: string;
}

const cardData: CardData[] = [
    {
        id: 'visit',
        title: '赠送额度',
        value: 1000000,
        unit: '',
        colors: [ '#ec4786', '#b955a4' ],
        icon: 'ant-design:bar-chart-outlined',
    },
    {
        id: 'amount',
        title: '累计使用',
        value: 234567.89,
        unit: '',
        colors: [ '#865ec0', '#5144b4' ],
        icon: 'ant-design:bar-chart-outlined',
    },
    {
        id: 'download',
        title: '可用次数',
        value: 666666,
        unit: '',
        colors: [ '#56cdf3', '#719de3' ],
        icon: 'ant-design:bar-chart-outlined',
    },
    {
        id: 'trade',
        title: '今日使用',
        value: 999999,
        unit: '',
        colors: [ '#fcbc25', '#f68057' ],
        icon: 'ant-design:bar-chart-outlined',
    },
]
</script>

<style scoped></style>
