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
    }
  }
})

export const { logout } = currentUserSlice.actions

export default currentUserSlice.reducer