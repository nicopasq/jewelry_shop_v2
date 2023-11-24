import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:'products',
    initialState: {},
    reducers:{
        addProduct:(state,action)=>{
            state.value = action.payload
        }
    }
})


export default productSlice.reducer