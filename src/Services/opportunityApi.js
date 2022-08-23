import {api} from "@/Services/api";

export const opportunityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        opportunityList: builder.query({
            query: (filterObj) => {
                let url = '/opportunities?'
                 console.log("SENDING OPPORTUNITY CALL: ",filterObj)
                if (filterObj) {
                    if (filterObj?.refID?.length>0) {
                        url = url + `f[reference_number]=${filterObj?.refID}&`
                    }
                    if (filterObj?.name.length>0) {
                        url = url + `s[name]=${filterObj?.name}&`
                    }
                    if (filterObj?.clientName.length>0) {
                        url = url + `s[client.name]=${filterObj?.clientName}&`
                    }
                    if (filterObj?.phone.length>0) {
                        url = url + `f[contact.phone]=${filterObj?.phone}&`
                    }
                    if (filterObj?.contactName.length>0) {
                        url = url + `s[contact.name]=${filterObj?.contactName}&`
                    }
                    if (filterObj?.addedBy.length>0) {
                        url = url + `s[created_by.name]=${filterObj?.addedBy}&`
                    }
                    if (filterObj?.clientType) {
                        url = url + `f[client.client_type.id][]=${filterObj?.clientId}&`
                    }
                    if(filterObj?.paginationInfo)
                    {
                        url=url+`page=${filterObj?.paginationInfo.page}`
                    }
                }

                console.log("SENDING REQ: ",url)

                return {
                    url: url,
                    method: "get",
                }
            },
        }),
    }),

})
export const {useOpportunityListQuery} = opportunityApi

