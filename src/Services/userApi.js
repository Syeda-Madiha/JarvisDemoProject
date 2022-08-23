import {api} from "@/Services/api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        userList: builder.query({
            query: () => {
                return {
                    url: "/users",
                    method: "get",
                }
            },
        }),
    }),

})
export const {useUserListQuery}=userApi
