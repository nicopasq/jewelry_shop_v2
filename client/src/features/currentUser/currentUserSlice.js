import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    login: (state, action) =>{
        state.value = action.payload
    },
    signup: (state, action) =>{
      state.value = action.payload
    },
    logout: (state, action) =>{
      state.value = action.payload
    },
    // updateBag: (state, action) =>{
    //   const bagItem = action.payload
    //   let currentBag = state.value.order_products

    // }
  }
})

export default currentUserSlice.reducer