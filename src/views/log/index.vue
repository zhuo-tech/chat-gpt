<template>
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
        <n-data-table :columns="columns" :data="tableData" :loading="loading" :pagination="pagination" />
    </n-card>

</template>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<script lang="ts" setup>
import { DB } from '@/service/request'
import { BizLog } from '@/views/log/BizLog'
import { DataTableColumns, PaginationProps } from 'naive-ui'
import { reactive, ref, Ref } from 'vue'

defineOptions({ name: 'LogPage' })

const loading = ref(false)
const tableData = ref<Array<BizLog>>([])
const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 20,
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
    DB.collection('biz_log')
        .page({ current: pagination.page!, size: pagination.pageSize! })
        .orderBy('time', 'desc')
        .get()
        .then(({ ok, data }) => {
            if (ok) {
                tableData.value = data
            }
        })
        .catch(err => {
            console.debug('错误: ', err)
            window.$message?.error(err?.message)
        })
}

// @ts-ignore
const columns: Ref<DataTableColumns<BizLog>> = ref([
    {
        key: 'time2',
        title: '时间',
        align: 'center',
    },
    {
        key: 'request',
        title: '请求',
        align: 'center',
    },
    {
        key: 'status',
        title: '状态',
        align: 'center',
    },
    {
        key: '响应',
        title: '标题',
        align: 'center',
    },
])

getTableData()

</script>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<style lang="sass" scoped>
</style>
