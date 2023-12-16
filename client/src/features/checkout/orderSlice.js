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
        shipping:{
            first_name:"",
            last_name:"",
            state: "",
            city: "",
            street_address: "",
            apt_number: "",
            zip_code: ""
        }
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