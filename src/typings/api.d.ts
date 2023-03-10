// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
    /** 返回的token和刷新token */
    interface Token {
        token: string;
        refreshToken: string;
    }

    /** 返回的用户信息 */
    type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
    /** 后端返回的路由数据类型 */
    interface Route {
        /** 动态路由 */
        routes: AuthRoute.Route[];
        /** 路由首页对应的key */
        home: AuthRoute.AllRouteKey;
    }
}

declare namespace ApiUserManagement {
    interface User {
        /** 用户id */
        id: string;
        /** 用户名 */
        userName: string | null;
        /** 用户年龄 */
        age: number | null;
        /**
         * 用户性别
         * - 0: 女
         * - 1: 男
         */
        gender: '0' | '1' | null;
        /** 用户手机号码 */
        phone: string;
        /** 用户邮箱 */
        email: string | null;
        /**
         * 用户状态
         * - 1: 启用
         * - 2: 禁用
         * - 3: 冻结
         * - 4: 软删除
         */
        userStatus: '1' | '2' | '3' | '4' | null;
    }
}

declare namespace Laf {
    interface Page<T> {
        total: number
        list: Array<T>
    }

    interface PageQuery {
        page: number
        size: number
    }

    export interface BizLog {
        _id: string
        time: number
        time2: string
        request: any
        status: number
        statusText: string
        response: any
    }

    export interface BizLogStatistics {
        lastDay: {
            hours: Record<string, StatusCount>
            minutes: Record<string, StatusCount>
        }
        lastWeek?: {
            days: Record<string, StatusCount>
            hours: Record<string, StatusCount>
        }
    }

    export interface StatusCount {
        success: number
        error: number
    }
    export interface BiUserDetails {
        _id: string
        uid: string
        key: 'count'
        value: CountValue
    }
    interface CountValue {
        "total": number
        "used": number
    }
    export interface BiTodayUse {
        ok: boolean
        total: number
    }
}
