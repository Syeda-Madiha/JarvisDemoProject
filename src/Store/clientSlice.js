import {createSlice} from '@reduxjs/toolkit'
import {clientApi} from "@/Services/clientApi";

const initialState = {
    clientData:[],
}

export const clientSlice= createSlice({
    name: 'ClientSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            clientApi.endpoints.clientList.matchFulfilled,
            (state, {payload}) => {
                state.clientData=payload.clients
                // console.log(state.opportunityData)
            }
        )
    }
})
export default clientSlice.reducer
