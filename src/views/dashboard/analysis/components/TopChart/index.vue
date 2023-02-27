<template>
  <n-grid :item-responsive="true" :x-gap="24" :y-gap="24">
    <n-grid-item span="0:24 640:24 1024:24">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div class="flex w-full h-360px">
          <div class="w-200px h-full py-12px">
            <h3 class="text-16px font-bold">数据概览</h3>
            <p class="text-[#aaa]">当天接口调用情况</p>
            <h3 class="pt-36px text-24px font-bold">
              <count-to
                :end-value="biUserDetails?.value.total"
                :start-value="0"
                suffix="次"
              />
            </h3>

            <p class="text-[#aaa]">平台赠送额度</p>
            <h3 class="pt-36px text-24px font-bold">
              <count-to
                :end-value="biUserDetails?.value.used"
                :start-value="0"
                suffix="次"
              />
            </h3>
            <p class="text-[#aaa]">已用次数</p>

            <n-popover trigger="click" >
              <template #trigger>
                <h3 class="pt-36px text-24px font-bold"  >
                  <n-badge dot type="error" >
                    <count-to  :end-value="usable" :start-value="0" suffix="次" />
                  </n-badge>
                </h3>
              </template>
              <template #header>
                <n-image
                  width="150"
                  
                  src="https://oss.lafyun.com/wofnib-image/2022-04-22-14-21-MRJH9o.png"
                />
                <n-text strong depth="1">
                  <p style="text-align: center;">微信群</p>
                </n-text>
              </template>
              <p style="text-align: center;">
                <a  
                  href="https://jq.qq.com/?_wv=1027&amp;k=DdRCCiuz"
                  target="_blank"
                  rel="nofollow"
                  >QQ 群：603059673</a
                >
              </p>
            </n-popover>

            <p class="text-[#aaa]">可用额度</p>
          </div>
          <div class="flex-1-hidden h-full">
            <div ref="lineRef" class="wh-full"></div>
          </div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { type ECOption, useEcharts } from '@/composables'
import { BizLogApi,BiUserDetailsApi } from '@/service'
import { StandardErrorProcessor } from '@/service/request'
import type { Ref } from 'vue'
import { ref } from 'vue'


const timeList:any  = ref([])

const errorList:any = ref([])

const successList:any = ref([])

const  usable = ref()

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


/**
 * 查询统计汇总用户调用api次数
 */
const biUserDetails = ref<Laf.BiUserDetails>()
const count =()=>{
    lineLoading.value = true
    BiUserDetailsApi.count()
        .then(res => {
            biUserDetails.value = res.data
            usable.value = res.data.value.total - res.data.value.used

        })
        .catch(StandardErrorProcessor)
        .finally(() => lineLoading.value = true)
}

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
count()

const getStatisticsData = (group: Record<string, Laf.StatusCount>) => {
    return {
        category: Object.keys(group).map(i => new Date(parseInt(i)).toLocaleString()),
        success: Object.values(group).map(i => i.success),
        error: Object.values(group).map(i => i.error),
    }
}
</script>

<style scoped></style>
