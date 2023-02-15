import { 嵌入 } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-embeddings',
    path: '/api/embeddings',
    meta: {
        title: 'embeddings',
        requiresAuth: true,
        icon: 'icon-park-outline:workbench',
    },
    children: [
        {
            name: 'api-embeddings-create',
            path: '/api/embeddings/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'image create',
                requiresAuth: true,
                icon: 'icon-park-outline:workbench',
            },
            props: () => ({ openAIApi: 嵌入.创建嵌入 }),
        },
    ],
}
