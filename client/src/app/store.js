import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../features/currentUser/currentUserSlice'
import productReducer from '../features/products/productSlice'
import bagReducer from '../features/bag/bagSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    products: productReducer,
    bag: bagReducer
  }
})