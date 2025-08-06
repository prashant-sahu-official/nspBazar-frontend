import { createSlice } from "@reduxjs/toolkit";

const myItemSlice = createSlice({
    name: "myItems",
    initialState: [],
    reducers: {
        addItems: (store, action) => {
            return action.payload;
        },
        deleteItem: (store, action) => {
            return store.filter(item => item._id !== action.payload);
        }
}});

export const myItemsActions = myItemSlice.actions;

export default myItemSlice;