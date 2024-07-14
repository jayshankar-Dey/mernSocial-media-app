import {createSlice} from "@reduxjs/toolkit"

const change=createSlice({
    name:"change",
    initialState:{
        change:"change"
    },
    reducers:{
        setChange:(state,action)=>{
            state.change=action.payload
        },
       
    }
})
export const {setChange}= change.actions
export default change.reducer