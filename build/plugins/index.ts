import unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { PluginOption } from 'vite'
import progress from 'vite-plugin-progress'
import compress from './compress'
import html from './html'
import pwa from './pwa'
import unplugin from './unplugin'
import visualizer from './visualizer'

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
    const plugins = [ vue(), vueJsx(), html(viteEnv), ...unplugin(viteEnv), unocss(), progress() ]

    if (viteEnv.VITE_VISUALIZER === 'Y') {
        plugins.push(visualizer as PluginOption)
    }
    if (viteEnv.VITE_COMPRESS === 'Y') {
        plugins.push(compress(viteEnv))
    }
    if (viteEnv.VITE_PWA === 'Y' || viteEnv.VITE_VERCEL === 'Y') {
        plugins.push(pwa())
    }

    return plugins
}
