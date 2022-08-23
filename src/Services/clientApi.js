import {api} from "@/Services/api";

export const clientApi = api.injectEndpoints({
    endpoints: (builder) => ({
        clientList: builder.query({
            query: () => {
                return {
                    url: "/clients",
                    method: "get",
                }
            },
        }),
    }),

})
export const {useClientListQuery}=clientApi
