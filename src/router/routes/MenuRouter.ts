// noinspection SpellCheckingInspection

import { BasicLayout } from '@/layouts'
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
                    title: '分析页',
                    requiresAuth: true,
                    icon: 'icon-park-outline:analysis',
                },
            },
            {
                name: 'dashboard_workbench',
                path: '/dashboard/workbench',
                component: () => import('@/views/dashboard/workbench/index.vue'),
                meta: {
                    title: '工作台',
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
    {
        name: 'about',
        path: '/about',
        component: BasicLayout,
        meta: {
            title: '关于',
            icon: 'fluent:book-information-24-regular',
            order: 10,
        },
        children: [
            {
                name: 'about_page',
                path: '/about/page',
                component: () => import('@/views/about/index.vue'),
                meta: {
                    title: '关于',
                    icon: 'fluent:book-information-24-regular',
                    order: 10,
                },
            },
        ],
    },
    {
        name: 'auth-demo',
        path: '/auth-demo',
        component: BasicLayout,
        children: [
            {
                name: 'auth-demo_permission',
                path: '/auth-demo/permission',
                component: () => import('@/views/auth-demo/permission/index.vue'),
                meta: {
                    title: '权限切换',
                    requiresAuth: true,
                    icon: 'ic:round-construction',
                },
            },
            {
                name: 'auth-demo_super',
                path: '/auth-demo/super',
                component: () => import('@/views/auth-demo/super/index.vue'),
                meta: {
                    title: '超级管理员可见',
                    icon: 'ic:round-supervisor-account',
                },
            },
        ],
        meta: {
            title: '权限示例',
            icon: 'ic:baseline-security',
            order: 5,
        },
    },
    {
        name: 'management',
        path: '/management',
        component: BasicLayout,
        children: [
            {
                name: 'management_auth',
                path: '/management/auth',
                component: () => import('@/views/management/auth/index.vue'),
                meta: {
                    title: '权限管理',
                    requiresAuth: true,
                    icon: 'ic:baseline-security',
                },
            },
            {
                name: 'management_role',
                path: '/management/role',
                component: () => import('@/views/management/role/index.vue'),
                meta: {
                    title: '角色管理',
                    requiresAuth: true,
                    icon: 'carbon:user-role',
                },
            },
            {
                name: 'management_user',
                path: '/management/user',
                component: () => import('@/views/management/user/index.vue'),
                meta: {
                    title: '用户管理',
                    requiresAuth: true,
                    icon: 'ic:round-manage-accounts',
                },
            },
            {
                name: 'management_route',
                path: '/management/route',
                component: () => import('@/views/management/route/index.vue'),
                meta: {
                    title: '路由管理',
                    requiresAuth: true,
                    icon: 'material-symbols:route',
                },
            },
        ],
        meta: {
            title: '系统管理',
            icon: 'carbon:cloud-service-management',
            order: 9,
        },
    },
    {
        name: 'plugin',
        path: '/plugin',
        component: BasicLayout,
        children: [
            {
                name: 'plugin_charts',
                path: '/plugin/charts',
                children: [
                    {
                        name: 'plugin_charts_echarts',
                        path: '/plugin/charts/echarts',
                        component: () => import('@/views/plugin/charts/echarts/index.vue'),
                        meta: {
                            title: 'ECharts',
                            requiresAuth: true,
                            icon: 'simple-icons:apacheecharts',
                        },
                    },
                    {
                        name: 'plugin_charts_antv',
                        path: '/plugin/charts/antv',
                        component: () => import('@/views/plugin/charts/antv/index.vue'),
                        meta: {
                            title: 'AntV',
                            requiresAuth: true,
                            icon: 'simple-icons:antdesign',
                        },
                    },
                ],
                meta: {
                    title: '图表',
                    icon: 'mdi:chart-areaspline',
                },
            },
            {
                name: 'plugin_map',
                path: '/plugin/map',
                component: () => import('@/views/plugin/map/index.vue'),
                meta: {
                    title: '地图',
                    requiresAuth: true,
                    icon: 'mdi:map',
                },
            },
            {
                name: 'plugin_video',
                path: '/plugin/video',
                component: () => import('@/views/plugin/video/index.vue'),
                meta: {
                    title: '视频',
                    requiresAuth: true,
                    icon: 'mdi:video',
                },
            },
            {
                name: 'plugin_editor',
                path: '/plugin/editor',
                children: [
                    {
                        name: 'plugin_editor_quill',
                        path: '/plugin/editor/quill',
                        component: () => import('@/views/plugin/editor/quill/index.vue'),
                        meta: {
                            title: '富文本编辑器',
                            requiresAuth: true,
                            icon: 'mdi:file-document-edit-outline',
                        },
                    },
                    {
                        name: 'plugin_editor_markdown',
                        path: '/plugin/editor/markdown',
                        component: () => import('@/views/plugin/editor/markdown/index.vue'),
                        meta: {
                            title: 'markdown编辑器',
                            requiresAuth: true,
                            icon: 'ri:markdown-line',
                        },
                    },
                ],
                meta: {
                    title: '编辑器',
                    icon: 'icon-park-outline:editor',
                },
            },
            {
                name: 'plugin_swiper',
                path: '/plugin/swiper',
                component: () => import('@/views/plugin/swiper/index.vue'),
                meta: {
                    title: 'Swiper插件',
                    requiresAuth: true,
                    icon: 'simple-icons:swiper',
                },
            },
            {
                name: 'plugin_copy',
                path: '/plugin/copy',
                component: () => import('@/views/plugin/copy/index.vue'),
                meta: {
                    title: '剪贴板',
                    requiresAuth: true,
                    icon: 'mdi:clipboard-outline',
                },
            },
            {
                name: 'plugin_icon',
                path: '/plugin/icon',
                component: () => import('@/views/plugin/icon/index.vue'),
                meta: {
                    title: '图标',
                    requiresAuth: true,
                    localIcon: 'custom-icon',
                },
            },
            {
                name: 'plugin_print',
                path: '/plugin/print',
                component: () => import('@/views/plugin/print/index.vue'),
                meta: {
                    title: '打印',
                    requiresAuth: true,
                    icon: 'mdi:printer',
                },
            },
        ],
        meta: {
            title: '插件示例',
            icon: 'clarity:plugin-line',
            order: 4,
        },
    },
]
