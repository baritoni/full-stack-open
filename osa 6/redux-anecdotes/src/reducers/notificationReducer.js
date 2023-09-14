import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Display notification message here',
  reducers: {
    notificationDisplay(state, action) {
      return action.payload
    }
  }
})

export const { notificationDisplay } = notificationSlice.actions
export default notificationSlice.reducer
