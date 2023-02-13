<template>
    <h1>首页</h1>
</template>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<script lang="ts" setup>
import { VITE_ROUTE_HOME_PATH } from '@/config'
import { getToken } from '@/store/modules/auth/helpers'
import { useRouter } from 'vue-router'

defineOptions({ name: 'Home' })
const router = useRouter()

// 已登录直接跳转到管理首页
if (getToken()) {
    router.push(VITE_ROUTE_HOME_PATH)
}

</script>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<style lang="sass" scoped>
</style>
