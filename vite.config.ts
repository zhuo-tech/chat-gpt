import { defineConfig, loadEnv } from 'vite'
import { getRootPath, getSrcPath, setupVitePlugins, viteDefine } from './build'

export default defineConfig(configEnv => {
    const viteEnv = loadEnv(configEnv.mode, './env') as unknown as ImportMetaEnv

    const rootPath = getRootPath()
    const srcPath = getSrcPath()

    return {
        base: viteEnv.VITE_BASE_URL,
        resolve: {
            alias: {
                '~': rootPath,
                '@': srcPath,
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            },
        },
        define: viteDefine,
        envDir: './env',
        plugins: setupVitePlugins(viteEnv),
        css: {
            preprocessorOptions: {
                scss: {
                    // language=scss
                    additionalData: `@use "./src/styles/scss/global.scss" as *;`,
                },
            },
        },
        server: {
            host: '0.0.0.0',
            port: 3200,
            open: false,
        },
        optimizeDeps: {
            include: [
                '@antv/data-set',
                '@antv/g2',
                '@better-scroll/core',
                'echarts',
                'swiper',
                'swiper/vue',
                'vditor',
                'wangeditor',
                'xgplayer',
            ],
        },
        build: {
            reportCompressedSize: false,
            sourcemap: false,
            commonjsOptions: {
                ignoreTryCatch: false,
            },
        },
    }
})
