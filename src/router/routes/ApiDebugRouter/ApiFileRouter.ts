import { 文件 } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-file',
    path: '/api/file',
    meta: {
        title: 'file',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-file-create',
            path: '/api/file/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 文件.上传文件 }),
        },
        {
            name: 'api-file-create',
            path: '/api/file/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 文件.上传文件 }),
        },
        {
            name: 'api-file-create',
            path: '/api/file/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 文件.上传文件 }),
        },
        {
            name: 'api-file-create',
            path: '/api/file/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 文件.上传文件 }),
        },
    ],
}
