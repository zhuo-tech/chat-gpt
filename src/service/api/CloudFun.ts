import { Post } from '@/service/request'
import type { AxiosRequestConfig, Method } from 'axios'

/**
 * 转发 OpenAI 请求
 */
export function openAIProxy<R, RW = R>(request: HttpRequest) {
    return Post<R, HttpRequest, RW>('/openAiProxy', request)
}

export function chatGptProxy(param: BodyType) {
    return Post('/chatGptProxy', param)
}

interface HttpRequest {
    url: string
    method: Method
    query?: Record<string, string>
    header?: AxiosRequestConfig['headers']
    body?: any
}

interface BodyType {
    /**
     * 发送的消息
     */
    text: string
    /**
     * @see Account.alias
     */
    account: string
    /**
     * 可选的上下文ID
     */
    contextId?: string
}
