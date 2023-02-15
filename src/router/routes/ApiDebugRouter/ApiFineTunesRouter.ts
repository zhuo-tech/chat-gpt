import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{

    name: 'api-fine-tunes',
    path: '/api/fine-tunes',
    meta: {
        title: 'fine-tunes',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
        {
            name: 'api-file-create',
            path: '/api/fine-tunes/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'file create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
        },
    ],
}
