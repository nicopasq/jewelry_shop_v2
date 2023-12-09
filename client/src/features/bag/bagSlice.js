import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
    name:'bag',
    initialState:[],
    reducers: {
        addToBag: (state, action) => {
            state.push(action.payload)
        }
    }
})

export default bagSlice.reducer;