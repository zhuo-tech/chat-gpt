import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-completions',
    path: '/api/completions',
    meta: {
        title: 'completions',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-finish-create',
            path: '/api/completions/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'completions',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
    ],
}