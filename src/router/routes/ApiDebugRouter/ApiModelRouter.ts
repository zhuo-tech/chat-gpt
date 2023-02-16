import { BasicLayout } from '@/layouts'
import { Model } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-model',
    path: '/api/model',
    meta: {
        title: '模型',
        requiresAuth: true,
        localIcon: 'api',
    },
    component: BasicLayout,
    children: [
        {
            path: '/api/model/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '列出模型',
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Model.列出模型 }),
        },
        {
            path: '/api/model/query',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '检索模型',
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Model.检索模型 }),
        },
    ],
}
