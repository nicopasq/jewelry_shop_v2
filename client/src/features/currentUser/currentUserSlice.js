import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    user:undefined,
    bag:[]
  },
  reducers: {
    login: (state, action) =>{
        state.user = action.payload
    },
    signup: (state, action) =>{
      state.user = action.payload
    },
    logout: (state, action) =>{
      state.user = action.payload
    },
    updateBag: (state, action) =>{
      state.bag.push(action.payload)
    }
  }
})

export default currentUserSlice.reducer