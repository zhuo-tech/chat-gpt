import { VITE_LAF_URL } from '@/config'
import { getToken } from '@/store/modules/auth/helpers'
import { Cloud } from 'laf-client-sdk'

export const CLOUD = new Cloud({
    baseUrl: VITE_LAF_URL,
    dbProxyUrl: '/proxy/admin',
    getAccessToken: getToken,
})

export const DB = CLOUD.database()
