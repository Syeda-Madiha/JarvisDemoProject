import {createSlice} from '@reduxjs/toolkit'
import {sourceApi} from "@/Services/sourceApi";

const initialState = {
    sourceData:[]
}

export const sourceSlice= createSlice({
    name: 'sourceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            sourceApi.endpoints.sourceList.matchFulfilled,
            (state, {payload}) => {
                state.sourceData=payload.sources
                // console.log(state.opportunityData)
            }
        )
    }
})
export default sourceSlice.reducer
