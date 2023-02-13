import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { routeName } from '@/router'
import { localStg } from '@/utils'

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    const isLogin = Boolean(localStg.get('token'))
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (isLogin) {
        return true
    }

    const redirect = to.fullPath
    next({ name: routeName('login'), query: { redirect } })
    return false
}
