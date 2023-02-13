import { VITE_BASE_URL, VITE_HASH_ROUTE } from '@/config'
import { StaticRouter, MenuRouter } from '@/router/routes'
import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { scrollBehavior } from './helpers'
import { createRouterGuard } from './guard'

export const router = createRouter({
    history: (VITE_HASH_ROUTE ?? 'N') === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
    routes: [
        ...StaticRouter,
        ...MenuRouter,
    ],
    scrollBehavior,
})

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
    app.use(router)
    createRouterGuard(router)
    await router.isReady()
}

/** 路由名称 */
export const routeName = (key: AuthRoute.AllRouteKey) => {
    console.debug('路由名称: ', key)
    return key
}
