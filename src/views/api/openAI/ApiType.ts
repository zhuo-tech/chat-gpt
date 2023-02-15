import { VITE_LAF_URL } from '@/config'
import { HttpMethod } from '@/views/api/Constant'

/**
 * ApiType
 *
 * @author 冰凝
 * @date 2023-02-15 15:54
 */
export interface ProxyApi<D = any> {
    readonly method: HttpMethod
    readonly url: string
    readonly header: Record<string, string>
    body?: D
}

export interface OpenAiApi {
    readonly url: string
    readonly method: HttpMethod
    body?: Record<string, any> | string

    readonly title?: string
    readonly desc?: string
    readonly link?: string
}

export const proxyApi: ProxyApi = {
    url: VITE_LAF_URL + 'open-ai',
    method: HttpMethod.POST,
    header: {},
}
