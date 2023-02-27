import cloud from '@lafjs/cloud'
import axios, { AxiosResponse } from 'axios'

// 常量 -------------------------------------------------------------------------------------------------------------------------
const HOST = 'https://api.openai.com'
const DB = cloud.database()
const CMD = DB.command
const DB_NAME = {
    BIZ_LOG: 'biz_log',
    BI_USER_DETAILS: 'bi_user_details',
}

// 主函数 -------------------------------------------------------------------------------------------------------------------------
/**
 * POST
 * 请求转发
 */
export async function main(ctx: FunctionContext) {
    const { uid } = getAuth(ctx)
    if (!uid) {
        return Response.error('非法请求: 请先登录', 401)
    }

    const TOKEN = cloud.shared.get('OPENAI_TOKEN')
    const FREE_QUOTA = cloud.shared.get('FREE_QUOTA')
    if (!TOKEN || FREE_QUOTA === null || FREE_QUOTA === undefined) {
        return Response.error('服务状态错误: 未初始化', 500)
    }

    const usage = await getOrCreateUsage(uid, parseInt(FREE_QUOTA))
    const { _id, value: { total, used } } = usage
    if (used >= total) {
        return Response.error('免费次数已用尽, 请联系我们哦^_^')
    }

    // 参数预处理: 附加 token, 补全 URL
    const param: HttpRequest = ctx.body
    param.header = {
        ...param.header ?? {},
        Authorization: TOKEN,
    }
    if (!(param.url.startsWith('http://') || param.url.startsWith('https://'))) {
        param.url = HOST + param.url
    }

    // 转发请求, 使用量+1, 记录日志
    let response: any = {}
    try {
        response = await axios.request(toAxiosConfig(param))

        await usageInc(_id)

        return Response.ok(response.data)
    } catch (e) {
        response = e
        return new Response(1, '服务器错误: ' + (e?.message ?? ''), e)
    } finally {
        // TODO: axios 对 HTTP 错误的处理未知, 错误响应可能拿不到. 也许换 fetch 好些
        await saveLog(uid, param, response)
    }

}

// 主函数结束 -------------------------------------------------------------------------------------------------------------------------

/**
 * 解析 token
 */
function getAuth(ctx: FunctionContext): Partial<AuthPayload> {
    const authorization = ctx.headers?.authorization
    const Authorization = ctx.headers?.Authorization

    if (authorization || Authorization) {
        return cloud.parseToken(authorization || Authorization)
    }

    return {}
}

/**
 * 查询 (如果不存在就初始化)使用量 信息
 */
async function getOrCreateUsage(uid: string, FREE_QUOTA: number): Promise<BiUserDetails> {
    const { data: usage } = await DB.collection(DB_NAME.BI_USER_DETAILS)
        .where({
            uid,
            key: 'count',
        })
        .getOne()

    if (usage) {
        return usage
    }

    const defUsage: Partial<BiUserDetails> = {
        uid, key: 'count',
        value: { total: FREE_QUOTA, used: 0 },
    }
    const { id } = await DB.collection(DB_NAME.BI_USER_DETAILS)
        .add(defUsage)

    return <BiUserDetails>{ ...defUsage, _id: <string>id }
}

/**
 * 使用次数加一
 */
async function usageInc(_id: string) {
    try {
        const { ok, updated } = await DB.collection(DB_NAME.BI_USER_DETAILS)
            .where({ _id })
            .update({ value: { used: CMD.inc(1) } })

        console.log('记录使用次数: ', _id, ok, updated)
    } catch (e) {
        console.log('记录使用次数出错: ', e)
    }
}

/**
 * 保存请求日志
 */
async function saveLog(uid: string, request: HttpRequest, response: AxiosResponse) {
    const { status, statusText, headers, data } = response
    const now = new Date()
    try {

        delete request?.header?.Authorization
        delete request?.header?.authorization

        const res = await DB.collection(DB_NAME.BIZ_LOG)
            .add({
                uid,
                time: Date.now(),
                time2: now.toISOString(),
                request: request,
                status: status,
                statusText: statusText,
                response: {
                    status: status,
                    statusText: statusText,
                    header: headers,
                    body: data,
                },
            })
        console.log('日志保存', res.ok)
    } catch (e) {
        console.log('日志保存错误', e)
    }
}

/**
 * 类型转换
 */
function toAxiosConfig(param: HttpRequest) {
    return {
        url: param.url,
        method: param.method as any,
        params: param.query,
        headers: param.header,
        data: param.body,
    }
}

/**
 * 通用响应结构
 */
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

// 类型声明 -------------------------------------------------------------------------------------------------------------------------

interface HttpRequest {
    url: string
    method: string
    query: string
    header: Record<string, string>
    body: any
}

interface AuthPayload {
    uid: string
    type: string
    exp: number
}

interface BiUserDetails {
    _id: string
    uid: string
    key: 'count'
    value: CountValue
}

interface CountValue {
    'total': number
    'used': number
}
