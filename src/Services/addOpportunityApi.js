import {api} from "@/Services/api";

export const addOpportunityApi= api.injectEndpoints({
    endpoints: (builder) => ({
        addList: builder.mutation({
            query: (body) => {
                return {
                    url: "/opportunities",
                    method: "post",
                    body
                }
            },
        }),
    }),

})
export const {useAddListMutation}=addOpportunityApi
