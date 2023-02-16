import ApiCompletionsRouter from '@/router/routes/ApiDebugRouter/ApiCompletionsRouter'
import ApiEditsRouter from '@/router/routes/ApiDebugRouter/ApiEditsRouter'
import ApiEmbeddingsRouter from '@/router/routes/ApiDebugRouter/ApiEmbeddingsRouter'
import ApiFileRouter from '@/router/routes/ApiDebugRouter/ApiFileRouter'
import ApiFineTunesRouter from '@/router/routes/ApiDebugRouter/ApiFineTunesRouter'
import ApiImageRoute from '@/router/routes/ApiDebugRouter/ApiImageRoute'
import ApiModelRouter from '@/router/routes/ApiDebugRouter/ApiModelRouter'
import { RouteRecordRaw } from 'vue-router'

// export default <RouteRecordRaw>{
//     name: 'API 调试',
//     path: '/api',
//     component: BasicLayout,
//     meta: {
//         title: 'API 调试',
//         localIcon: 'api',
//         order: 1,
//     },
//     children: [
//         ApiModelRouter,
//         ApiCompletionsRouter,
//         ApiEditsRouter,
//         ApiImageRoute,
//         ApiEmbeddingsRouter,
//         ApiFileRouter,
//         ApiFineTunesRouter,
//     ],
// }

export default <Array<RouteRecordRaw>>[
    ApiModelRouter,
    ApiCompletionsRouter,
    ApiEditsRouter,
    ApiImageRoute,
    ApiEmbeddingsRouter,
    ApiFileRouter,
    ApiFineTunesRouter,
]
