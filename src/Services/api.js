import {Config} from '@/Config'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: (headers, {getState}) => {
        let user = getState()?.user?.loggedInUser
        if (getState()?.user?.loggedInUser && getState()?.user?.loggedInUser?.headers) {
            headers.set('access-token', user?.headers["access-token"])
            headers.set('client', user?.headers?.client)
            headers.set('uid', user?.headers?.uid)
        }
        return headers
    },

})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // here you can deal with 401 error

    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({}),
})
