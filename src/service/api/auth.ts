import { Get, Post } from '../request'

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 * @deprecated 暂不支持
 */
export function fetchSmsCode(phone: string) {
    return Post<boolean>('/getSmsCode', { phone })
}

/**
 * 登录
 * @param username - 用户名
 * @param password - 密码
 */
export function fetchLogin(username: string, password: string) {
    return Post<ApiAuth.Token>('/admin-login', { username, password })
}

/** 获取用户信息 */
export function fetchUserInfo() {
    return Get<ApiAuth.UserInfo>('/getUserInfo')
}

/**
 * 用户注册
 */
export function userRegister(phone: string, password: string) {
    return Post('/userRegister', { phone, password })
}
