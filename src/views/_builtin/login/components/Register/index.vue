<template>
    <n-spin :show="show">
        <n-form ref="formRef" :model="model" :rules="rules" :show-label="false" size="large">
            <n-form-item path="phone">
                <n-input v-model:value="model.phone" placeholder="手机号码" />
            </n-form-item>
            <n-form-item path="pwd">
                <n-input v-model:value="model.pwd" placeholder="密码" show-password-on="click" type="password" />
            </n-form-item>
            <n-form-item path="confirmPwd">
                <n-input v-model:value="model.confirmPwd" placeholder="确认密码" show-password-on="click" type="password" />
            </n-form-item>
            <n-space :size="18" :vertical="true">
                <!--<login-agreement v-model:value="agreement" />-->
                <n-button :block="true" :round="true" size="large" type="primary" @click="handleSubmit">确定</n-button>
                <n-button :block="true" :round="true" size="large" @click="toLoginModule('pwd-login')">返回</n-button>
            </n-space>
        </n-form>
    </n-spin>
</template>

<script lang="ts" setup>
import { useRouterPush } from '@/composables'
import { userRegister } from '@/service'
import { StandardErrorProcessor } from '@/service/request'
import { formRules, getConfirmPwdRule } from '@/utils'
import type { FormInst, FormRules } from 'naive-ui'
import { reactive, ref, toRefs } from 'vue'

defineOptions({ name: 'Register' })
const { toLoginModule } = useRouterPush()
const formRef = ref<HTMLElement & FormInst>()
const show = ref(false)
const model = reactive({
    phone: '',
    code: '',
    pwd: '',
    confirmPwd: '',
})

const rules: FormRules = {
    phone: formRules.phone,
    code: formRules.code,
    pwd: formRules.pwd,
    confirmPwd: getConfirmPwdRule(toRefs(model).pwd),
}

async function handleSubmit() {
    await formRef.value?.validate()
    const { phone, pwd } = model

    show.value = true
    userRegister(phone, pwd)
        .then(({ code, msg }) => {
            // 注册成功
            if (code === 0) {
                toLoginModule('pwd-login')
            } else {
                window.$message?.warning(msg)
            }
        })
        .catch(StandardErrorProcessor)
        .finally(() => show.value = false)
}
</script>

<style scoped></style>
