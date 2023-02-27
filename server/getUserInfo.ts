import cloud from '@lafjs/cloud'

const DB = cloud.database()
const DB_NAME = {
    SYS_USER: 'sys_admin',
    SYS_PASSWORD: 'sys_password',
    SYS_ROLE: 'sys_role',
    SYS_PERMISSION: 'sys_permission',
}

/**
 * GET
 * @param ctx
 */
export async function main(ctx: FunctionContext) {
    const { uid, type } = getAuth(ctx)
    if (!uid) {
        return Response.error('非法请求', 401)
    }

    if (type === 'admin') {
        const info = await getAdminUserInfo(uid)
        return Response.ok(info)
    }

    return Response.error('不支持的类型: ' + type, 500)
}

async function getAdminUserInfo(uid: string) {
    const { data: user } = await DB.collection(DB_NAME.SYS_USER)
        .where({ _id: uid })
        .getOne()

    return user
}

function getAuth(ctx: FunctionContext): Partial<AuthPayload> {
    const authorization = ctx.headers?.authorization
    const Authorization = ctx.headers?.Authorization

    if (authorization || Authorization) {
        return cloud.parseToken(authorization || Authorization)
    }

    return {}
}

interface AuthPayload {
    uid: string
    type: string
    exp: number
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
