import {api} from "@/Services/api";

export const sourceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sourceList: builder.query({
            query: () => {
                return {
                    url: "/sources",
                    method: "get",
                }
            },
        }),
    }),

})
export const {useSourceListQuery}=sourceApi
