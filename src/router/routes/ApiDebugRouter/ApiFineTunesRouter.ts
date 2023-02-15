import { 微调 } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{

    name: 'api-fine-tunes',
    path: '/api/fine-tunes',
    meta: {
        title: 'fine-tunes',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.列出微调 }),
        },
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.创建微调 }),
        },
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.检索微调 }),
        },
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.取消微调 }),
        },
    ],
}
