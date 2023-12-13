import { createSlice } from "@reduxjs/toolkit";

const totalSlice = createSlice({
    name:'total',
    initialState:{},
    reducers: {
        total:(state, action) =>{
            state.value = action.payload
        }
    }
})

export default totalSlice.reducer;