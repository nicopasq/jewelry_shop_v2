import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        billing:{
            first_name: "",
            last_name: "",
            card_number: "",
            expiration_date: "",
            cvv: "",
        },
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