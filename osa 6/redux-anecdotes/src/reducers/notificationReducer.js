import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationDisplay(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    }
  }
})

export const { notificationDisplay, hideNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
