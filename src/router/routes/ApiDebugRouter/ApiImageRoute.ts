import { 图像 } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-image',
    path: '/api/image',
    meta: {
        title: '图像',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-image-create',
            path: '/api/image/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建图像',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 图像.创建映像试用版 }),
        },
        {
            name: 'api-image-edit',
            path: '/api/image/edit',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建图像编辑',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 图像.创建图像编辑试用版 }),
        },
        {
            name: 'api-image-variations',
            path: '/api/image/variations',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建图像变体',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 图像.创建图像变体试用版 }),
        },
    ],
}
