import cloud from '@lafjs/cloud'

const DB = cloud.database()

const DB_NAME = {
    BIZ_LOG: 'biz_log',
}

interface QueryParam {
    page: string
    size: string
}

/**
 * GET
 * 分页查询调用日志
 */
export async function main(ctx: FunctionContext) {
    const { uid } = getAuth(ctx)
    if (!uid) {
        return Response.error('非法请求', 401)
    }

    const { total } = await DB.collection(DB_NAME.BIZ_LOG)
        .where({ uid })
        .count()

    if (total <= 0) {
        return Response.ok({ total: 0, list: [] })
    }

    const { page, size } = ctx.query as QueryParam
    const { data } = await DB.collection(DB_NAME.BIZ_LOG)
        .where({ uid })
        .orderBy('time', 'desc')
        .page({ current: parseInt(page), size: parseInt(size) })
        .get()

    return Response.ok({ total, list: data })
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
