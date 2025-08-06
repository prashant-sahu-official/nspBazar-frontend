import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addInitialWishlist : (state, action) => {
            return action.payload;
        },
        addItem: (state, action) => {
            return [...state, action.payload];
        },
        removeItem : (state, action) => {
            return state.filter(item => item._id !== action.payload);
        }
    }
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice ;