import { Post } from '@/service/request'
import type { AxiosRequestConfig, Method } from 'axios'

/**
 * 转发 OpenAI 请求
 */
export function openAi(request: HttpRequest) {
    return Post<any, HttpRequest, any>('/open-ai', request)
}

interface HttpRequest {
    url: string
    method: Method
    query: Record<string, string>
    header: AxiosRequestConfig['headers']
}
