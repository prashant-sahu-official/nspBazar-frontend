import { createSlice } from "@reduxjs/toolkit" ;

const descriptionSlice = createSlice({
    name : 'description',
    initialState : {},
    reducers : {
        addDescription : (state, action)=>{
            return action.payload ;
        }
    }
})

export const descriptionActions = descriptionSlice.actions ;

export default descriptionSlice ;