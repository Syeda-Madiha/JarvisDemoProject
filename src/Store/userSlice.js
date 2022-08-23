import {createSlice} from '@reduxjs/toolkit'
import {userApi} from "@/Services/userApi";

const initialState = {
    userData:[]
}

export const userSlice= createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.userList.matchFulfilled,
            (state, {payload}) => {
                state.userData=payload.users
                // console.log(state.opportunityData)
            }
        )
    }
})
export default userSlice.reducer
