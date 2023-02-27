import cloud from '@lafjs/cloud'
import * as crypto from 'crypto'

const DB = cloud.database()

const DB_NAME = {
    SYS_USER: 'sys_admin',
    SYS_PASSWORD: 'sys_password',
    SYS_ROLE: 'sys_role',
    SYS_PERMISSION: 'sys_permission',
}

/**
 * POST
 * @param ctx
 */
export async function main(ctx: FunctionContext) {
    const { phone, password } = ctx.body

    if (!phone || !password) {
        return Response.error('参数错误', 400)
    }

    try {
        const user = await getUserByPhone(phone)
        if (user) {
            return Response.error('手机号已注册')
        }

        const pwd = PasswordTool.encrypt('sha256', password)
        await saveUserAndPassword(phone, pwd)

    } catch (e) {
        console.log(e)
        return Response.error('服务器错误', 500)
    }

    return Response.ok('')
}

async function getUserByPhone(phone: string) {
    const { data } = await DB.collection(DB_NAME.SYS_USER)
        .where({ username: phone })
        .getOne()

    return data
}

async function saveUserAndPassword(phone: string, password: string) {
    const { id: uid } = await DB.collection(DB_NAME.SYS_USER)
        .add({
            username: phone,
            // TODO: 随机/默认头像
            avatar: '',
        })

    await DB.collection(DB_NAME.SYS_PASSWORD)
        .add({
            uid, password,
            type: 'login',
        })
}

class PasswordTool {
    /**
     * 加密方式映射
     * - key: 加密方式, 保存在密码头中
     * - value: 加密字符串的方法
     */
    private static readonly encryptionMapping = {
        /**
         * 明文: "{none}"
         */
        none: (s: string) => s,
        /**
         * 哈希: "{sha256}"
         */
        sha256: (s: string) => crypto.createHash('sha256').update(s).digest('hex'),
    }
    /**
     * 密码格式: [{加密方式}]<非空字符密文>
     */
    private static readonly encryption = new RegExp('^(\\{([\\dA-Za-z]+)})?(\\S+)$')

    /**
     * 检查密码
     * @param password 客户端提供未加密密码
     * @param ciphertext 数据库保存的加密后的密码
     */
    public static check(password: string, ciphertext: string) {
        const arr = this.encryption.exec(ciphertext)
        // 密码格式不正确
        if (!arr) {
            return false
        }

        const type: keyof typeof PasswordTool.encryptionMapping = (arr[2] ?? 'sha256') as any
        const cipher = arr[3]

        // 如果找不到合适的加密函数, 表达式应为: undefined === cipher
        return this.encryptionMapping[type]?.(password) === cipher
    }

    /**
     * 加密
     */
    public static encrypt(type: keyof typeof PasswordTool.encryptionMapping, password: string) {
        const fun = this.encryptionMapping[type]
        if (!fun) {
            throw new Error('未知类型: ' + type)
        }
        return `{${ type }}` + fun?.(password)
    }
}

class Response<T> {
    public code: number
    public msg: string
    public data: T

    constructor(code: number, msg: string, data: T) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    public static ok<T = any>(data: T, msg: string = ''): Response<T> {
        return new Response<T>(0, msg, data)
    }

    public static error(msg: string, code: number = 1) {
        return new Response(code, msg, null)
    }
}
