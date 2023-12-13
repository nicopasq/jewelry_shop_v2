import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{},
    reducers: {
        createOrder:(state,action) => {
            state.value = action.payload
        }
    }
})

export default orderSlice.reducer;