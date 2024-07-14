/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@mui/material"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import { setChange } from "../redux/changSlice"
import { useEffect, useState } from "react"
import socket from ".././Socket"
const ShowRegisterPeople = ({users}) => {
  const dispatch=useDispatch()
  const {profile,name,_id,request}=users
  const {user}=useSelector(state=>state.user)
  const[follow,setFollow]=useState(false)
 
  useEffect(()=>{
   
  }) 
  ///addrequest
  const addRequest=async(id)=>{
    dispatch(setChange(id))
    const res=await axios.post(`/api/request`,{id},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch(setChange(res.data.message))
    socket.emit("addfriends",{id})
  }
///addUnrequest
  const addunRequest=async(id)=>{
    dispatch(setChange(id))
    const res= await axios.post(`/api/unrequest`,{id},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch(setChange(res.data.message))
    socket.emit("unfriends",{id})
  }
  useEffect(()=>{
    socket.on('request',data=>{
      console.log(data)
    })
  },[socket])
  return (
    <div  className="flex flex-wrap gap-x-7 text-sm font-semibold items-center w-60 cursor-pointer">
      <Link to={`/profile/${_id}`} className="h-10 w-10 lg:w-14 lg:h-14 p-1 border rounded-full bg-black overflow-hidden ">
       {
        profile?.url? <img src={profile.url} alt=""  className="object-cover object-center"/>: <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""  className="object-cover object-center"/>
       }
      </Link>
      <div>
      {/* user?.friends?.includes(_id) || */}
        <Link to={`/profile/${_id}`}>{name}</Link>
        {
          user?.friends?.includes(_id)?"":(
            <>
            {_id !== user?._id&&<div className="mt-2">
            {follow || request.includes(user?._id)?<Button variant="contained"    ><span className="text-[12px]" onClick={()=>{
              addunRequest(_id)
              setFollow(false)
            }}>Request</span></Button>:<Button variant="contained" size="small" onClick={()=>{
              addRequest(_id)
              setFollow(true)
            }} ><span className="text-[12px]">Add friend</span></Button>}
        </div>}
            </>
          )
        }
      </div>
    </div>
  )
}

export default ShowRegisterPeople
