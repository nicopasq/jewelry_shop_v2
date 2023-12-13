import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../features/currentUser/currentUserSlice'
import productReducer from '../features/products/productSlice'
import totalReducer from '../features/bag/totalSlice'
import orderReducer from '../features/checkout/orderSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    products: productReducer,
    total: totalReducer,
    order: orderReducer
  }
})