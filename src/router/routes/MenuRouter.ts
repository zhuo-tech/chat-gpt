// noinspection SpellCheckingInspection

import { BasicLayout } from '@/layouts'
import ApiDebugRouter from '@/router/routes/ApiDebugRouter'
import { RouteRecordRaw } from 'vue-router'

export default <Array<RouteRecordRaw>>[
    {
        name: 'dashboard',
        path: '/dashboard',
        component: BasicLayout,
        children: [
            {
                name: 'dashboard_analysis',
                path: '/dashboard/analysis',
                component: () => import('@/views/dashboard/analysis/index.vue'),
                meta: {
                    title: '首页',
                    requiresAuth: true,
                    icon: 'icon-park-outline:analysis',
                },
            },
            {
                name: 'dashboard_workbench',
                path: '/dashboard/workbench',
                component: () => import('@/views/dashboard/workbench/index.vue'),
                meta: {
                    title: '调用记录',
                    requiresAuth: true,
                    icon: 'icon-park-outline:workbench',
                },
            },
        ],
        meta: {
            title: '仪表盘',
            icon: 'mdi:monitor-dashboard',
            order: 1,
        },
    },
    ApiDebugRouter,
]
