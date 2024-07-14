/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import {getUserData} from "../redux/UserSlice"
import {useDispatch,useSelector} from "react-redux"
const PrivetRoute = ({children}) => {
   // const {user} =useSelector(state=>state.user)
   // console.log(user)
 const token=localStorage.getItem("token")
 const dispatch=useDispatch()
 const getUser=async()=>{
  try {
   const res=await axios.get(`/api/getusers`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
     })
     dispatch(getUserData(res.data.user))
  } catch (error) {
   if(error){
      localStorage.clear()
   }
  }
 }
 useEffect(()=>{
   getUser()
 })


 if(token){
    return children
 }else{
    return <Navigate to={'/login'}/>
 }
}

export default PrivetRoute
