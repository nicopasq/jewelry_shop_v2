import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../features/currentUser/currentUserSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer
  }
})