<template>
    <n-form ref="formRef" :model="model" :rules="rules" :show-label="false" size="large">
        <n-form-item path="userName">
            <n-input v-model:value="model.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password">
            <n-input v-model:value="model.password" placeholder="请输入密码" show-password-on="click" type="password" />
        </n-form-item>
        <n-space :size="24" :vertical="true">
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
                <div class="w-12px"></div>
                <n-button :block="true" class="flex-1" @click="toLoginModule('register')">
                    {{ EnumLoginModule.register }}
                </n-button>
            </div>
        </n-space>
    </n-form>
</template>

<script lang="ts" setup>
import { useRouterPush } from '@/composables'
import { EnumLoginModule } from '@/enum'
import { useAuthStore } from '@/store'
import { formRules } from '@/utils'
import type { FormInst, FormRules } from 'naive-ui'
import { reactive, ref } from 'vue'

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

async function handleSubmit() {
    await formRef.value?.validate()
    const { userName, password } = model
    login(userName, password)
}

</script>

<style scoped></style>
