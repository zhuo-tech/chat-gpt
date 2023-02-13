import { MenuOption } from 'naive-ui'

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: Array<MenuOption>) {
    return menus.map(menu => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1)
}

function getActiveKeyPathsOfMenu(activeKey: string, menu: MenuOption) {
    const keys: string[] = []
    if (activeKey.startsWith(menu.key as string)) {
        keys.push(menu.key as string)
    }
    if (menu.children) {
        keys.push(...menu.children.map(item => getActiveKeyPathsOfMenu(activeKey, item as MenuOption)).flat(1))
    }
    return keys
}
