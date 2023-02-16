import { Edit } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-edit',
    path: '/api/edit',
    meta: {
        title: '编辑',
        requiresAuth: true,
        localIcon: 'folder',
    },
    children: [
        {
            name: 'api-edit-create',
            path: '/api/edit/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: '创建编辑',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Edit.创建编辑 }),
        },
    ],
}
