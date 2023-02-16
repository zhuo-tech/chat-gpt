import { BasicLayout } from '@/layouts'
import { Image } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-image',
    path: '/api/image',
    meta: {
        title: '图像',
        requiresAuth: true,
        localIcon: 'api',
    },
    component: BasicLayout,
    children: [
        {
            name: 'api-image-create',
            path: '/api/image/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建图像',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Image.创建映像试用版 }),
        },
        {
            name: 'api-image-edit',
            path: '/api/image/edit',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建图像编辑',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Image.创建图像编辑试用版 }),
        },
        {
            name: 'api-image-variations',
            path: '/api/image/variations',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建图像变体',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Image.创建图像变体试用版 }),
        },
    ],
}
