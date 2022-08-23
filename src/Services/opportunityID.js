import {api} from "@/Services/api";

export const opportunityID = api.injectEndpoints({
    endpoints: (builder) => ({
        idList: builder.query({
            query: (id) => {
                let url='/tasks?'
                return {
                    url: url+`f[related_to_id]=${id}&f[related_to_type]=Crm::Opportunity`,
                    method: "get",
                }
            },
        }),
    }),

})
export const {useIdListQuery}=opportunityID
