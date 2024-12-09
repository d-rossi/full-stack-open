import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterString: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterString(state, action) {
            state.filterString = action.payload
        }

    }
})

export default filterSlice.reducer
export const { setFilterString } = filterSlice.actions