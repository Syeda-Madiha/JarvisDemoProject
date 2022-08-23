import {createSlice} from '@reduxjs/toolkit'
import {opportunityApi} from "@/Services/opportunityApi";

const initialState = {
    opportunityData: [],
    opportunityType: [],
    clientType: []
}

export const opportunitySlice = createSlice({
    name: 'opportunitySlice',
    initialState,
    reducers: {
        emptyList: (state,action)=>{
            state.opportunityData = []
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            opportunityApi.endpoints.opportunityList.matchFulfilled,
            (state, {payload}) => {

                if (payload?.pagination.current_page > 1) {
                    state.opportunityData = [...state.opportunityData, ...payload.opportunities]
                } else {
                    state.opportunityData = payload.opportunities
                }
                state.opportunityType = payload.opportunity_types
                state.clientType = payload.client_types
            }
        )
    }
})
export const {emptyList} = opportunitySlice.actions

export default opportunitySlice.reducer
