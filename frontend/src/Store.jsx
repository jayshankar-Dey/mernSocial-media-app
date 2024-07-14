import { configureStore } from "@reduxjs/toolkit"; 
import loadingSlice from '../src/redux/Loading'
import UserSlice from "./redux/UserSlice";
import changSlice from "./redux/changSlice";
export const store=configureStore({
    reducer:{
        loading:loadingSlice,
        user:UserSlice,
        change:changSlice
    }
})