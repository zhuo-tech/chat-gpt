import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-edit',
    path: '/api/edit',
    meta: {
        title: 'edit',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-edit-create',
            path: '/api/edit/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'edit',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
    ],
}
