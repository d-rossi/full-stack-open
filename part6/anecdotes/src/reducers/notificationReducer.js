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

export const showNotification = (message, timeInSec) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(setMessage(''))
        }, timeInSec*1000)
    }
}

export default notificationSlice.reducer
export const { setMessage } = notificationSlice.actions