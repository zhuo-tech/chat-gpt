import cloud from '@lafjs/cloud'

const DB = cloud.database()
const CMD = DB.command
const DB_NAME = {
    BIZ_LOG: 'biz_log',
}

/**
 * GET
 * @param ctx
 */
export async function main(ctx: FunctionContext) {

    const { uid } = getAuth(ctx)
    if (!uid) {
        return Response.error('非法请求', 401)
    }
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)

    const result = await DB.collection(DB_NAME.BIZ_LOG)
        .where({
            time: CMD.gte(now.getTime()),
            uid,
        })
        .count()

    return result
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
