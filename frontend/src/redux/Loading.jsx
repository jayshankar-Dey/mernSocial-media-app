/* eslint-disable react-refresh/only-export-components */
import {createSlice} from "@reduxjs/toolkit"

const loadingSlice=createSlice({
    name:"Loading",
    initialState:{
        loading:false
    },
    reducers:{
        show:(state)=>{
            state.loading = true
        },
        hide:(state)=>{
            state.loading = false
        }

    }
})

export default loadingSlice.reducer

export const {show,hide}=loadingSlice.actions