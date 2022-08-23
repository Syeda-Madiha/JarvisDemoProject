import {createSlice} from '@reduxjs/toolkit'
import {userApi} from "@/Services/fetchApi";

const initialState = {
    localData: '',
    loggedInUser:{},
}

export const localSlice = createSlice({
    name: 'localSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.loginUser.matchFulfilled,
            (state, {payload}) => {
                state.loggedInUser = payload
            }
        )
    }
})
export const {localData} = localSlice.actions

export default localSlice.reducer
