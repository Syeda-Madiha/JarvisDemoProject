import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
    filterData: {
        refID: '',
        name: '',
        clientName: '',
        phone: '',
        contactName: '',
        addedBy: '',
        clientType: '',
        clientId: '',
        paginationInfo: {
            page:1
        },
    }
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        filterData: (state, action) => {
            state.filterData = action.payload
        },
        resetFilters: (state,action) =>{
            state.filterData = initialState.filterData
        }
    },

})
export const {filterData,resetFilters} = filterSlice.actions
export default filterSlice.reducer
