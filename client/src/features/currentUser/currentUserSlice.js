import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    user:undefined
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
    update: (state, action) =>{
      state.user = action.payload
    },

  }
})

export default currentUserSlice.reducer