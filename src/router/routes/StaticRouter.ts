import { VITE_ROUTE_HOME_PATH } from '@/config'
import { getLoginModuleRegExp } from '@/utils'
import { RouteRecordRaw } from 'vue-router'

/** 固定的路由 */
export default <Array<RouteRecordRaw>>[
    {
        name: 'root',
        path: '/',
        redirect: VITE_ROUTE_HOME_PATH,
        meta: {
            title: 'Root',
        },
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/_builtin/login/index.vue'),
        props: route => {
            const moduleType = (route.params.module as EnumType.LoginModuleKey) || 'pwd-login'
            return {
                module: moduleType,
            }
        },
        meta: {
            title: '登录',
            dynamicPath: `/login/:module(${ getLoginModuleRegExp() })?`,
            singleLayout: 'blank',
        },
    },
    {
        name: 'constant-page',
        path: '/constant-page',
        component: () => import('@/views/_builtin/constant-page/index.vue'),
        meta: {
            title: '固定页面',
            singleLayout: 'blank',
        },
    },
    {
        name: '403',
        path: '/403',
        component: () => import('@/views/_builtin/403/index.vue'),
        meta: {
            title: '无权限',
            singleLayout: 'blank',
        },
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/_builtin/404/index.vue'),
        meta: {
            title: '未找到',
            singleLayout: 'blank',
        },
    },
    {
        name: '500',
        path: '/500',
        component: () => import('@/views/_builtin/500/index.vue'),
        meta: {
            title: '服务器错误',
            singleLayout: 'blank',
        },
    },
    // 匹配无效路径的路由
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/_builtin/not-found/index.vue'),
        meta: {
            title: '未找到',
            singleLayout: 'blank',
        },
    },
]
