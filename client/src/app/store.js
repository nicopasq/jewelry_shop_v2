import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../features/currentUser/currentUserSlice'
import productReducer from '../features/products/productSlice'
import orderReducer from '../features/checkout/orderSlice'
import jewelryTypeReducer from '../features/home/jewelryTypeSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    products: productReducer,
    order: orderReducer,
    jewelryType: jewelryTypeReducer
  }
})