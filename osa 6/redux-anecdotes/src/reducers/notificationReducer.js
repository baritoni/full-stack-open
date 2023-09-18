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

export const setNotification = (message, milliseconds) => {
  const time = milliseconds * 1000
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
    dispatch(notificationDisplay(message))
  }
}

export const { notificationDisplay, hideNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
