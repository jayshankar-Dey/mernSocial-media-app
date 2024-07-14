/* eslint-disable no-unused-vars */

import {Container} from "@mui/material"
import Navbar from "./Navbar"
import PostShowPage from "./PostShowPage"
import FollowPage from "./FollowPage"
import RequestsShowPage from "./RequestsShowPage"
import { useEffect, useState } from "react"
import {io} from 'socket.io-client'
import {useSelector,useDispatch} from "react-redux"
import { setChange } from "../redux/changSlice"
import { setOnline } from "../redux/UserSlice"
const Home = () => {
  const[showRequest,setShowRequest]=useState(false)
  const[confirm,setconfirm]=useState(false)
  const socket=io('http://localhost:8080/')
   
  const dispatch=useDispatch()
  const user=useSelector(state=>state.user)
  // const {online}=useSelector(state=>state)
  // console.log(online)
  
  // const id=user.user._id
  // console.log(id)
  useEffect(()=>{
    socket.on('connect',(sock)=>{
      console.log('connecteted',socket.id)
      socket.emit('adduser',{userId:user?.user?._id,socketID:socket.id})
      ///unrequest////////////
      socket.on('unrequest',data=>{
        dispatch(setChange(data))
      })
      /////request user////
      socket.on('request',data=>{
        dispatch(setChange(data))
      })

      socket.on("getNotifacion", (data)=>{
       
        dispatch(setChange(data))
      })
      socket.on("onlineuser",data=>{
        console.log(data)
        
      })
     
    })

  })
 
  return (
    <div className="w-full h-fit bg-gray-200 ">
<Container  className="p-0 bg-white sm:bg-transparent">
  <Navbar/>
  <div className="md:flex md:gap-x-2 justify-between relative">
  <RequestsShowPage confirm={confirm} setconfirm={()=>setconfirm(!confirm)}/>
  <PostShowPage setShwRequest={()=>setShowRequest(!showRequest)} setconfirm={()=>setconfirm(!confirm)}/>
  <FollowPage  showRequest={showRequest} setShwRequest={()=>setShowRequest(!showRequest)}/>
  </div>
</Container>
    </div>
  )
}

export default Home
