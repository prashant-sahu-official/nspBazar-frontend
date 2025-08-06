import { createSlice } from "@reduxjs/toolkit";

const isLoginSlice = createSlice({
    name : "isLogin" ,
    initialState : false,
    reducers : {
        setLogin : (state, action) => {
            return action.payload ;
        }
    }
})

export const isLoginActions = isLoginSlice.actions;
export default isLoginSlice;