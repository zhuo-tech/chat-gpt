import { Get } from '@/service/request'

/**
 * BiUserDetailsApi
 *
 * @author jee
 * @date 2023-02-16 00:23
 */
export class BiUserDetailsApi {

    /**
     * 统计
     */
    public static count() {
        return Get<Laf.BiUserDetails>('/bi-user-quota')
    }

      /**
     * 统计使用次数
     */
       public static todayuse() {
        return Get<Laf.BiTodayUse>('/bi-today-use')
    }


}
