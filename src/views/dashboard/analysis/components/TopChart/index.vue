<template>
    <n-grid :item-responsive="true" :x-gap="24" :y-gap="24" >
        <n-grid-item span="0:24 640:24 1024:24" class="w-full">
            <n-card :bordered="false" class="rounded-16px shadow-sm">
                <div class="flex w-full h-360px">
                    <div class="w-200px h-full py-12px">
                        <h3 class="text-16px font-bold">数据概览</h3>
                        <p class="text-[#aaa]">当天接口调用情况</p>
                        <h3 class="pt-36px text-24px font-bold">
                            <count-to :end-value="100" :start-value="0" suffix="次" />
                        </h3>
                        <p class="text-[#aaa]">平台赠送额度</p>
                        <h3 class="pt-36px text-24px font-bold">
                            <count-to :end-value="99" :start-value="0" suffix="次" />
                        </h3>
                        <p class="text-[#aaa]">已用次数</p>
                        <h3 class="pt-36px text-24px font-bold">
                            <count-to :end-value="1" :start-value="0" suffix="次" />
                        </h3>
                        <p class="text-[#aaa]">可用额度</p>
                    </div>
                    <div class="flex-1-hidden h-full ">
                        <div ref="lineRef" class="wh-full"></div>
                    </div>
                </div>
            </n-card>
        </n-grid-item>

    </n-grid>
</template>

<script lang="ts" setup>
import { type ECOption, useEcharts } from '@/composables'
import { BizLogApi } from '@/service'
import { StandardErrorProcessor } from '@/service/request'
import type { Ref } from 'vue'
import { ref } from 'vue'


const timeList:any  = ref([])

const errorList:any = ref([])

const successList:any = ref([])

defineOptions({ name: 'DashboardAnalysisTopCard' })

const lineOptions = ref<ECOption>({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            },
        },
    },
    legend: {
        data: [ '调用错误计数', '正常调用计数' ],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data:timeList,
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            color: '#ff0000',
            name: '调用错误计数',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0.25, color: '#ff0000' },
                        { offset: 1, color: '#fff' },
                    ],
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: errorList,
        },
        {
            color: '#8e9dff',
            name: '正常调用计数',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0.25, color: '#8e9dff' },
                        { offset: 1, color: '#fff' },
                    ],
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: successList,
        },
    ],
}) as Ref<ECOption>
const lineLoading = ref(false)
const { domRef: lineRef } = useEcharts(lineOptions)



const getLogStatistics = () => {
    lineLoading.value = true
    BizLogApi.statistics()
        .then(res => {
            const { lastDay } = res.data
            const { minutes } = lastDay

            // 横坐标, 两组数据源
            const { category, error, success } = getStatisticsData(minutes)


            errorList.value = error
            successList.value = success


            category.forEach((item:any) => {
                timeList.value.push(item.slice(10,15) )                  
            }); 
        })
        .catch(StandardErrorProcessor)
        .finally(() => lineLoading.value = true)
}

getLogStatistics()

const getStatisticsData = (group: Record<string, Laf.StatusCount>) => {
    return {
        category: Object.keys(group).map(i => new Date(parseInt(i)).toLocaleString()),
        success: Object.values(group).map(i => i.success),
        error: Object.values(group).map(i => i.error),
    }
}

</script>

<style scoped></style>
