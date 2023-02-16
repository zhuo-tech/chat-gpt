import { BasicLayout } from '@/layouts'
import { Finish } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-completions',
    path: '/api/completions',
    meta: {
        title: '完成',
        requiresAuth: true,
        localIcon: 'api',
    },
    component: BasicLayout,
    children: [
        {
            name: 'api-finish-create',
            path: '/api/completions/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建 completions',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Finish.创建完成 }),
        },
    ],
}
