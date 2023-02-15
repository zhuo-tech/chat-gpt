import { 模型 } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-model',
    path: '/api/model',
    meta: {
        title: '模型',
        requiresAuth: true,
        icon: 'icon-park-outline:analysis',
    },
    children: [
        {
            path: '/api/model/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '列出模型',
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 模型.列出模型 }),
        },
        {
            path: '/api/model/query',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '检索模型',
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 模型.检索模型 }),
        },
    ],
}
