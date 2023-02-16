import { BasicLayout } from '@/layouts'
import { File } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-file',
    path: '/api/file',
    meta: {
        title: '文件',
        requiresAuth: true,
        localIcon: 'api',
    },
    component: BasicLayout,
    children: [
        {
            name: 'api-file-list',
            path: '/api/file/list',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '列出文件',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: File.列出文件 }),
        },
        {
            name: 'api-file-upload',
            path: '/api/file/upload',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '上传文件',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: File.上传文件 }),
        },
        {
            name: 'api-file-delete',
            path: '/api/file/delete',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '删除文件',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: File.删除文件 }),
        },
        {
            name: 'api-file-retrieval',
            path: '/api/file/retrieval',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '检索文件',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: File.检索文件 }),
        },
        {
            name: 'api-file-retrieval-content',
            path: '/api/file/retrieval/content',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '检索文件内容',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: File.检索文件内容 }),
        },
    ],
}
