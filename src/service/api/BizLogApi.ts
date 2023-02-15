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

}
