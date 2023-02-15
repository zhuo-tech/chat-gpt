<template>
    <n-config-provider :hljs="Highlight">
        <n-card :bordered="false" class="rounded-16px shadow-sm" title="用户管理">
            <n-space class="pb-12px" justify="space-between">
                <n-space></n-space>
                <n-space :size="18" align="center">
                    <n-button size="small" type="primary" @click="getTableData">
                        <icon-mdi-refresh :class="{ 'animate-spin': loading }" class="mr-4px text-16px" />
                        刷新
                    </n-button>
                </n-space>
            </n-space>
            <n-data-table
                ref="table"
                :columns="columns"
                :data="tableData"
                :loading="loading"
                :pagination="pagination"
                :remote="true"
                :row-key="line => line._id"
                max-height="70vh"
                @update:page="onPageChange"
                @update:pageSize="onPageSizeChange"
            />
        </n-card>
    </n-config-provider>

</template>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<script lang="tsx" setup>
import { BizLogApi } from '@/service'
import Highlight from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import http from 'highlight.js/lib/languages/json'
import { DataTableColumns, PaginationProps } from 'naive-ui'
import { reactive, ref } from 'vue'

defineOptions({ name: 'LogPage' })
Highlight.registerLanguage('json', json)
Highlight.registerLanguage('http', http)
const loading = ref(false)
const tableData = ref<Array<Laf.BizLog>>([])
const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 20,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [ 10, 15, 20, 25, 30 ],
    onChange: (page: number) => {
        pagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
    },
})
const getTableData = () => {
    const { page = 1, pageSize = 20 } = pagination
    loading.value = true
    BizLogApi.page({ page, size: pageSize })
        .then(res => {
            tableData.value = res.data?.list
            pagination.itemCount = res.data?.total
        })
        .catch(err => {
            console.debug('错误: ', err)
            window.$message?.error(err?.message)
        })
        .finally(() => loading.value = false)
}

const onPageChange = (page: number) => {
    pagination.page = page
    getTableData()
}
const onPageSizeChange = (size: number) => {
    pagination.pageSize = size
    getTableData()
}

const columns = ref([
    {
        type: 'expand',
        align: 'center',
        expandable: () => true,
        renderExpand: (line) => {
            return (
                <div>
                    <n-h2>请求:</n-h2>
                    <n-code code={ JSON.stringify(line.request, null, 4) } language="json" word-wrap />
                    <n-divider />
                    <n-h2>响应:</n-h2>
                    <n-code code={ JSON.stringify(line.response, null, 4) } language="json" word-wrap />
                </div>
            )
        },
    },
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
        render: (line) => (<n-code code={ JSON.stringify(line.request) } language="json" word-wrap />),
    },
] as DataTableColumns<Laf.BizLog>)

getTableData()

</script>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<style lang="sass" scoped>
</style>
