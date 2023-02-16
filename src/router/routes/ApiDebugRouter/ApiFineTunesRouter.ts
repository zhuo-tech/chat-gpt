import { BasicLayout } from '@/layouts'
import { FineTune } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{

    name: 'api-fine-tunes',
    path: '/api/fine-tunes',
    meta: {
        title: 'fine-tunes',
        requiresAuth: true,
        localIcon: 'api',
    },
    component: BasicLayout,
    children: [
        {
            name: 'api-fine-tunes-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes create',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: FineTune.创建微调 }),
        },
        {
            name: 'api-fine-tunes-list',
            path: '/api/fine-tunes/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes list',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: FineTune.列出微调 }),
        },
        {
            name: 'api-fine-tunes-retrieval',
            path: '/api/fine-tunes/retrieval',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes retrieval',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: FineTune.检索微调 }),
        },
        {
            name: 'api-fine-tunes-cancel',
            path: '/api/fine-tunes/cancel',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes cancel',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: FineTune.取消微调 }),
        },
        {
            name: 'api-fine-tunes-event-list',
            path: '/api/fine-tunes/event/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes event list',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: FineTune['List fine-tune events'] }),
        },
        {
            name: 'api-fine-tunes-event-delete',
            path: '/api/fine-tunes/event/delete',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes event delete',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: FineTune['Delete fine-tune model'] }),
        },
    ],
}
