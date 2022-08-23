import {createSlice} from '@reduxjs/toolkit'
import {taskApi} from "@/Services/taskApi";

const initialState = {
    taskData:[],
}

export const taskSlice= createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            taskApi.endpoints.taskList.matchFulfilled,
            (state, {payload}) => {
                state.taskData = payload.tasks
              // debugger
                // console.log(state.opportunityData)
            }
        )
    }
})
export default taskSlice.reducer
