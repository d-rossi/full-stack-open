import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: ''
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload
        }
    } 
})

export default notificationSlice.reducer
export const { setMessage } = notificationSlice.actions