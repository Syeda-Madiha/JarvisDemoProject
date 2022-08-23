import {api} from "@/Services/api";

export const taskApi = api.injectEndpoints({
    endpoints: (builder) => ({
        taskList: builder.query({
            query: () => {
                return {
                    url: "/tasks",
                    method: "get",
                }
            },
        }),
    }),

})
export const {useTaskListQuery}=taskApi
