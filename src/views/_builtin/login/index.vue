<template>
    <div :style="{ backgroundColor: bgColor }" class="relative flex-center wh-full">
        <dark-mode-switch
            :dark="theme.darkMode"
            class="absolute left-48px top-24px z-3 text-20px"
            @update:dark="theme.setDarkMode"
        />
        <n-card :bordered="false" class="z-4 !w-auto rounded-20px shadow-sm" size="large">
            <div class="w-300px sm:w-360px">
                <header class="flex-y-center justify-between">
                    <n-gradient-text :size="28" type="primary">{{ title }}</n-gradient-text>
                </header>
                <main class="pt-24px">
                    <h3 class="text-18px text-primary font-medium">{{ activeModule.label }}</h3>
                    <div class="pt-24px">
                        <transition appear mode="out-in" name="fade-slide">
                            <component :is="activeModule.component" />
                        </transition>
                    </div>
                </main>
            </div>
        </n-card>
        <login-bg :theme-color="bgThemeColor" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Component } from 'vue'
import { EnumLoginModule } from '@/enum'
import { useThemeStore } from '@/store'
import { useAppInfo } from '@/composables'
import { getColorPalette, mixColor } from '@/utils'
import { BindWechat, CodeLogin, LoginBg, PwdLogin, Register, ResetPwd } from './components'

interface Props {
    /** 登录模块分类 */
    module: EnumType.LoginModuleKey;
}

const props = defineProps<Props>()

const theme = useThemeStore()
const { title } = useAppInfo()

interface LoginModule {
    key: EnumType.LoginModuleKey;
    label: EnumLoginModule;
    component: Component;
}

const modules: LoginModule[] = [
    { key: 'pwd-login', label: EnumLoginModule['pwd-login'], component: PwdLogin },
    { key: 'code-login', label: EnumLoginModule['code-login'], component: CodeLogin },
    { key: 'register', label: EnumLoginModule.register, component: Register },
    { key: 'reset-pwd', label: EnumLoginModule['reset-pwd'], component: ResetPwd },
    { key: 'bind-wechat', label: EnumLoginModule['bind-wechat'], component: BindWechat },
]

const activeModule = computed(() => {
    const active: LoginModule = { ...modules[0] }
    const findItem = modules.find(item => item.key === props.module)
    if (findItem) {
        Object.assign(active, findItem)
    }
    return active
})

const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor))

const bgColor = computed(() => {
    const COLOR_WHITE = '#ffffff'
    const ratio = theme.darkMode ? 0.5 : 0.2
    return mixColor(COLOR_WHITE, theme.themeColor, ratio)
})
</script>

<style scoped></style>
