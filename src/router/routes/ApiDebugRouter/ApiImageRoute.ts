import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-image',
    path: '/api/image',
    meta: {
        title: 'image',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-image-create',
            path: '/api/image/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'image create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
        {
            name: 'api-image-edit',
            path: '/api/image/edit',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'image edit',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
        {
            name: 'api-image-variations',
            path: '/api/image/variations',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'image variations',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
    ],
}
