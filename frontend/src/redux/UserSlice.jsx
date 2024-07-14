/* eslint-disable no-unused-vars */
import {createSlice} from "@reduxjs/toolkit"

// eslint-disable-next-line react-refresh/only-export-components
const UserSlice=createSlice({
    name:"users",
    initialState:{
        user:null,
        online:null
    },
    reducers:{
        getUserData:(state,action)=>{
         state.user=action.payload
        },
        setOnline:(state,action)=>{
        state.online=action.payload
        }
    }
})
export const {getUserData,setOnline} =UserSlice.actions
export default UserSlice.reducer