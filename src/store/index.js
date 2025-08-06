import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import fetchStatusSlice, { fetchStatusActions } from "./fetchStatusSlice";
import bagSlice from "./bagSlice";
import descriptionSlice from "./descriptionSlice";
import myItemsSlice from "./myItemsSlice";
import wishlistSlice from "./wishlistSlice";
import isLoginSlice from "./isLoginSlice";

const myntraStore = configureStore({
  reducer: {
    items: itemSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    bag: bagSlice.reducer,
    description: descriptionSlice.reducer,
    myItems: myItemsSlice.reducer,
    wishlist: wishlistSlice.reducer,
    isLogin: isLoginSlice.reducer,
  },
});

export default myntraStore;
