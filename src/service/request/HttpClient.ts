import { VITE_LAF_URL } from '@/config'
import { getToken } from '@/store/modules/auth/helpers'
import { Axios, AxiosRequestConfig } from 'axios'

/**
 * Http 客户端
 *
 * @author 冰凝
 * @date 2023/1/1 3:24
 */
const axios = new Axios({
    baseURL: VITE_LAF_URL,
    timeout: 1000 * 10,
    timeoutErrorMessage: '请求等待10秒仍未有响应, 请求超时',
    withCredentials: false,
    maxRedirects: 3,
    transformRequest: [
        (data, headers) => {
            if (String(headers.getContentType()).startsWith('application/json') && data) {
                return JSON.stringify(data)
            }
            return data
        },
    ],
    transformResponse: [
        (data, headers) => {
            if (String(headers.getContentType()).startsWith('application/json') && data) {
                return JSON.parse(data)
            }
            return data
        },
    ],
})

/**
 * 全局请求拦截
 */
axios.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        if (!config.headers) {
            config.headers = {} as any
        }
        config.headers.Authorization = token
    }

    return config
})

/**
 * 全局响应拦截
 */
axios.interceptors.response.use(
    axiosResponse => HttpResponseAssertion(axiosResponse.data),
    StandardErrorProcessor,
    { synchronous: false },
)

/**
 * 通用请求
 * - R: 接口响应数据 (被通用响应结构包装的数据)
 * - D: 接口请求数据 (请求体)
 * - TR: 通用响应结构
 * @param config 请求配置信息
 */
export function Request<
    R,
    D = Record<string, any>,
    TR = HttpResponse<R>
>(config: HttpRequest<D>): Promise<TR> {
    return axios.request<R, TR, D>(config)
}

export function Get<
    R,
    D = Record<string, any>,
    TR = HttpResponse<R>
>(url: string, config?: HttpRequest<D>): Promise<TR> {
    return axios.get<R, TR, D>(url, config)
}

export function Delete<
    R,
    D = Record<string, any>,
    TR = HttpResponse<R>
>(url: string, config?: HttpRequest<D>): Promise<TR> {
    return axios.delete<R, TR, D>(url, config)
}

export function Post<
    R,
    D = Record<string, any>,
    TR = HttpResponse<R>
>(url: string, data?: D, config?: HttpRequest<D>): Promise<TR> {
    return axios.post<R, TR, D>(url, data, {
        ...config,
        headers: {
            ...config?.headers,
            'Content-Type': 'application/json',
        },
    })
}

export function PostForm<R, TR = HttpResponse<R>>(url: string, data?: FormData, config?: HttpRequest<FormData>): Promise<TR> {
    return axios.post<R, TR, FormData>(url, data, config)
}

export function Put<
    R,
    D = Record<string, any>,
    TR = HttpResponse<R>
>(url: string, data?: D, config?: HttpRequest<D>): Promise<TR> {
    return axios.put<R, TR, D>(url, data, {
        ...config,
        headers: {
            ...config?.headers,
            'Content-Type': 'application/json',
        },
    })
}

/**
 * 通用请求参数 <br>
 * 避免过度依赖 axios 类型
 */
export interface HttpRequest<D> extends AxiosRequestConfig<D> {}

/**
 * 服务器通用响应结构
 */
export interface HttpResponse<R = any> {
    code: 0 | number
    data: R
    msg: string
}

function HttpResponseAssertion(data: any): Promise<any> {
    if (typeof data.code === 'number') {
        if (data.code === 0) {
            return Promise.resolve(data)
        } else {
            return Promise.reject(data)
        }
    }
    return Promise.reject(data)
}

/**
 * 通用错误处理
 */
export function StandardErrorProcessor(error: any): void {
    console.debug('[HTTP 响应错误]: ', error)
}
