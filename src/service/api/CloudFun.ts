import { Post } from '@/service/request'
import type { AxiosRequestConfig, Method } from 'axios'

/**
 * 转发 OpenAI 请求
 */
export function openAIProxy<R, RW = R>(request: HttpRequest) {
    return Post<R, HttpRequest, RW>('/open-ai', request)
}

interface HttpRequest {
    url: string
    method: Method
    query?: Record<string, string>
    header?: AxiosRequestConfig['headers']
    body?: any
}
