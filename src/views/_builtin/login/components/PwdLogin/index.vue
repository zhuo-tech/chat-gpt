<template>
    <n-form ref="formRef" :model="model" :rules="rules" :show-label="false" size="large">
        <n-form-item path="userName">
            <n-input v-model:value="model.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password">
            <n-input v-model:value="model.password" placeholder="请输入密码" show-password-on="click" type="password" />
        </n-form-item>
        <n-space :size="24" :vertical="true">
            <div class="flex-y-center justify-between">
                <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
                <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
            </div>
            <n-button
                :block="true"
                :loading="auth.loginLoading"
                :round="true"
                size="large"
                type="primary"
                @click="handleSubmit"
            >
                确定
            </n-button>
            <div class="flex-y-center justify-between">
                <n-button :block="true" class="flex-1" @click="toLoginModule('code-login')">
                    {{ EnumLoginModule['code-login'] }}
                </n-button>
                <div class="w-12px"></div>
                <n-button :block="true" class="flex-1" @click="toLoginModule('register')">
                    {{ EnumLoginModule.register }}
                </n-button>
            </div>
        </n-space>
        <other-account @login="handleLoginOtherAccount" />
    </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { EnumLoginModule } from '@/enum'
import { useAuthStore } from '@/store'
import { useRouterPush } from '@/composables'
import { formRules } from '@/utils'
import { OtherAccount } from './components'

const auth = useAuthStore()
const { login } = useAuthStore()
const { toLoginModule } = useRouterPush()

const formRef = ref<HTMLElement & FormInst>()

const model = reactive({
    userName: '',
    password: '',
})

const rules: FormRules = {
    password: formRules.pwd,
}

const rememberMe = ref(false)

async function handleSubmit() {
    await formRef.value?.validate()

    const { userName, password } = model

    login(userName, password)
}

function handleLoginOtherAccount(param: { userName: string; password: string }) {
    const { userName, password } = param
    login(userName, password)
}
</script>

<style scoped></style>
