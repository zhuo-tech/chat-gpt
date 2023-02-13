import { Post } from '../request'

/** 获取用户列表 */
export const fetchUserList = async () => {
    const data = await Post<ApiUserManagement.User[] | null>('/getAllUserList')
    return adapterOfFetchUserList(data.data)
}

export function adapterOfFetchUserList(data: ApiUserManagement.User[] | null): UserManagement.User[] {
    if (!data) return []

    return data.map((item, index) => {
        return <UserManagement.User>{
            index: index + 1,
            key: item.id,
            ...item,
        }
    })
}
