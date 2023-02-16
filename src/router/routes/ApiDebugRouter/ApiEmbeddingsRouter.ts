import { BasicLayout } from '@/layouts'
import { Embed } from '@/views/api/openAI'
import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw>{
    name: 'api-embeddings',
    path: '/api/embeddings',
    meta: {
        title: 'embeddings',
        requiresAuth: true,
        localIcon: 'api',
    },
    component: BasicLayout,
    children: [
        {
            name: 'api-embeddings-create',
            path: '/api/embeddings/create',
            component: () => import('@/views/api/index.vue'),
            meta: {
                title: 'image create',
                requiresAuth: true,
                localIcon: 'brackets-outline',
            },
            props: () => ({ openAIApi: Embed.创建嵌入 }),
        },
    ],
}
