import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../features/currentUser/currentUserSlice'
import productReducer from '../features/products/productSlice'
import orderReducer from '../features/checkout/orderSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    products: productReducer,
    order: orderReducer,
  }
})