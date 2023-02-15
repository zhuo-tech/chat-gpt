<template>
    <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
        <n-grid-item span="0:24 640:24 1024:8">
            <n-card :bordered="false" class="rounded-16px shadow-sm" title="时间线">
                <n-timeline>
                    <n-timeline-item v-for="item in timelines" :key="item.type" v-bind="item" />
                </n-timeline>
            </n-card>
        </n-grid-item>
        <n-grid-item span="0:24 640:24 1024:16">
            <n-card :bordered="false" class="rounded-16px shadow-sm" title="最近调用记录">
                <n-data-table
                    ref="table"
                    :columns="columns"
                    :data="tableData"
                    :loading="loading"
                    :remote="true"
                    :row-key="line => line._id"
                    max-height="40vh"
                />
            </n-card>
        </n-grid-item>
    </n-grid>
</template>

<script lang="tsx" setup>

import { BizLogApi } from '@/service'
import { StandardErrorProcessor } from '@/service/request'
import { DataTableColumns } from 'naive-ui'
import { ref } from 'vue'

defineOptions({ name: 'DashboardAnalysisBottomPart' })

interface TimelineData {
    type: 'default' | 'info' | 'success' | 'warning' | 'error';
    title: string;
    content: string;
    time: string;
}

interface TableData {
    key: number;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const loading = ref(false)
const tableData = ref<Array<Laf.BizLog>>([])

const timelines: TimelineData[] = [
    { type: 'default', title: '啊', content: '', time: '2021-10-10 20:46' },
    { type: 'success', title: '成功', content: '哪里成功', time: '2021-10-10 20:46' },
    { type: 'error', title: '错误', content: '哪里错误', time: '2021-10-10 20:46' },
    { type: 'warning', title: '警告', content: '哪里警告', time: '2021-10-10 20:46' },
    { type: 'info', title: '信息', content: '是的', time: '2021-10-10 20:46' },
]

const columns = [
    {
        key: 'time2',
        title: '时间',
        align: 'center',
        width: '150px',
        ellipsis: { tooltip: true },
    },
    {
        key: 'request.url',
        title: 'URL',
        align: 'left',
        width: '250px',
        ellipsis: { tooltip: true },
        render: (line) => (<n-code code={ `${ line.request.method } ${ line.request.url }` } language="json" />),
    },
    {
        key: 'status',
        title: '状态',
        align: 'center',
        width: '100px',
        render: (line) => (<span>{ line.status } { line.statusText }</span>),
    },
    {
        key: 'request',
        title: '请求',
        align: 'left',
        ellipsis: { tooltip: true },
        minWidth: 100,
        render: (line) => (<n-code code={ JSON.stringify(line.request) } language="json" />),
    },
] as DataTableColumns<Laf.BizLog>

const getLog = () => {
    loading.value = true
    BizLogApi.lastList()
        .then(list => tableData.value = list)
        .catch(StandardErrorProcessor)
        .finally(() => loading.value = false)
}
getLog()

</script>

<style scoped></style>
