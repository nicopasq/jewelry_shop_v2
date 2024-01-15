import { createSlice } from "@reduxjs/toolkit";

const jewelryTypeSlice = createSlice({
    name: "jewelryType",
    initialState: "",
    reducers: {
        change(state, action) {
            return state = action.payload;
        },
        resetFilter(state){
            return state = "all"
        }
    }
})

export default jewelryTypeSlice.reducer