import {api} from "@/Services/api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => {
                return {
                    url: "/auth/sign_in",
                    method: "post",
                    body,
                }
            },
            transformResponse: (response, meta, error) => {

                let headers = {
                    client: meta?.response?.headers?.get("client"),
                    uid: meta?.response?.headers?.get("uid"),
                    "access-token": meta?.response?.headers?.get("access-token")
                }
                let data = {
                    headers: headers,
                    ...response?.data
                }
                return data
            }
        }),


    }),

})

export const {useLoginUserMutation} = userApi;

