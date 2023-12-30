import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        billing:{
            first_name: "",
            last_name: "",
            card_number: "",
            expiration: "",
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
        },
        clear:(state) => {
            state = { billing:{
                first_name: "",
                last_name: "",
                card_number: "",
                expiration: "",
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
            }}
            return state
        }
    }
})

export default orderSlice.reducer;