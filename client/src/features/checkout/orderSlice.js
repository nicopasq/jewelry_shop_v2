import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        billing:{},
        shipping:{}
    },
    reducers: {
        billing:(state,action) => {
            state.billing = action.payload
        },
        shipping:(state, action) => {
            state.shipping = action.payload;
        }
    }
})

export default orderSlice.reducer;