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
            name: 'api-fine-tunes-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.创建微调 }),
        },
        {
            name: 'api-fine-tunes-list',
            path: '/api/fine-tunes/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes list',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.列出微调 }),
        },
        {
            name: 'api-fine-tunes-retrieval',
            path: '/api/fine-tunes/retrieval',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes retrieval',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.检索微调 }),
        },
        {
            name: 'api-fine-tunes-cancel',
            path: '/api/fine-tunes/cancel',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes cancel',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调.取消微调 }),
        },
        {
            name: 'api-fine-tunes-event-list',
            path: '/api/fine-tunes/event/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes event list',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调['List fine-tune events'] }),
        },
        {
            name: 'api-fine-tunes-event-delete',
            path: '/api/fine-tunes/event/delete',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'fine-tunes event delete',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 微调['Delete fine-tune model'] }),
        },
    ],
}
