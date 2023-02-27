import cloud from '@lafjs/cloud'

const DB = cloud.database()
const CMD = DB.command
const DB_NAME = {
    BIZ_LOG: 'biz_log',
}

// 主函数 ------------------------------------------------------------------------------------------------------------
/**
 * GET
 * 调用量统计
 */
export async function main(ctx: FunctionContext) {
    const { uid } = getAuth(ctx)
    if (!uid) {
        return Response.error('非法请求', 401)
    }

    const now = Date.now()

    const { data: list } = await DB.collection(DB_NAME.BIZ_LOG)
        .where({
            uid,
            time: CMD.gte(now - (1000 * 60 * 60 * 24)),
        })
        .field({ time: 1, _id: 1, status: 1 })
        .get()

    if (list.length <= 0) {
        return Response.ok(LogStatistics.ofLastDay({}, {}))
    }

    // 统计粒度: 小时
    const hours = groupCount(list, log => {
        const time = new Date(log.time)
        // 清空: 分, 秒, 毫秒
        time.setMinutes(0)
        time.setSeconds(0)
        time.setMilliseconds(0)
        return {
            key: time.getTime(),
            value: log.status === 200 ? 1 : -1,
        }
    })

    // 统计粒度: 分钟
    const minutes = groupCount(list, log => {
        const time = new Date(log.time)
        // 清空: 秒, 毫秒
        time.setSeconds(0)
        time.setMilliseconds(0)
        return {
            key: time.getTime(),
            value: log.status === 200 ? 1 : -1,
        }
    })

    return Response.ok(LogStatistics.ofLastDay(hours, minutes))
}

// 主函数 ------------------------------------------------------------------------------------------------------------

class LogStatistics<S = Record<string, any>> {
    /**
     * 最近一天
     */
    public lastDay: { hours: S, minutes: S }

    /**
     * 最近一周
     */
    public lastWeek?: { days: S, hours: S }

    public static ofLastDay<S = Record<string, any>>(hours: S, minutes: S) {
        const o = new LogStatistics()
        o.lastDay = { hours, minutes }
        return o
    }
}

/**
 * 分组计数
 */
function groupCount<T>(list: Array<T>, keyFun: (value: T) => { key: number, value: number }): Record<number, { success: number, error: number }> {
    if (!list || !list.length) {
        return {} as any
    }

    return list.reduce((group, current) => {
        const { key, value } = keyFun(current)

        if (!group[key]) {
            group[key] = { success: 0, error: 0 }
        }
        if (value > 0) {
            group[key].success = (group[key].success ?? 0) + 1
        } else {
            group[key].error = (group[key].error ?? 0) + 1
        }

        return group
    }, {} as any)
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
