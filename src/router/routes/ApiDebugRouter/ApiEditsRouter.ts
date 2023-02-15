import { 编辑 } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-edit',
    path: '/api/edit',
    meta: {
        title: '编辑',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-edit-create',
            path: '/api/edit/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建编辑',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 编辑.创建编辑 }),
        },
    ],
}
