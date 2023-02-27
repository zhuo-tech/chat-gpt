import cloud from '@lafjs/cloud'

const DB = cloud.database()
const DB_NAME = {
    SYS_USER: 'sys_admin',
    SYS_PASSWORD: 'sys_password',
    SYS_ROLE: 'sys_role',
    SYS_PERMISSION: 'sys_permission',
}

export async function main(ctx: FunctionContext) {

    // 初始化 ChatGPT(OpenAI) Token
    // cloud.shared.set('OPENAI_TOKEN', 'Bearer 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')
    cloud.shared.set('OPENAI_TOKEN', 'Bearer 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')

    // 初始化 免费配额
    cloud.shared.set('FREE_QUOTA', 100)

    // 如果用户不存在, 初始化默认用户: admin/111111
    const { total: userSize } = await DB.collection(DB_NAME.SYS_USER).count()
    if (userSize <= 0) {
        const { id } = await DB.collection(DB_NAME.SYS_USER).add({ 'username': 'admin' })
        await DB.collection(DB_NAME.SYS_PASSWORD).add({
            'uid': id,
            'type': 'login',
            'password': '{none}111111',
        })
    }

    return '初始化完成'
}
