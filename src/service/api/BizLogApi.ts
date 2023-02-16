import { Get } from '@/service/request'

/**
 * BizLogApi
 *
 * @author 冰凝
 * @date 2023-02-16 00:23
 */
export class BizLogApi {

    public static page(params: Laf.PageQuery) {
        return Get<Laf.Page<Laf.BizLog>>('/bizLogPage', { params })
    }

    /**
     * 最新的记录, 依赖 {@link page} 的排序方式
     */
    public static async lastList(size: number = 10) {
        const res = await this.page({ size, page: 1 })
        return res.data.list ?? []
    }

    /**
     * 调用统计
     */
    public static statistics() {
        return Get<Laf.BizLogStatistics>('/bizLogStatistics')
    }

}
