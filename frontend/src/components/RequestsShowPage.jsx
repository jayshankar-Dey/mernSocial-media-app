/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import RequestPeople from "./RequestPeople"
import axios from "axios"
import {useSelector} from "react-redux"
import socket from "../Socket"
const RequestsShowPage = ({confirm,setconfirm}) => {
  const [users,setUsers]=useState()
  const{change}=useSelector(state=>state.change)
  const getRequestUsers=async()=>{
    const res=await axios.get('/api/request/users',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    setUsers(res.data.user.request)
  }
  useEffect(()=>{
    getRequestUsers()
  },[change])

  return (
    <div className={`h-[92vh] ${users&&"w-fit"} ${confirm?" absolute  top-0 bottom-0 flex bg-white  right-0  w-full z-20":"hidden"} md:flex  mt-2 rounded  w-[37%]   items-center flex-col gap-y-4 pt-2`}>
      <div className="relative text-2xl  w-full md:hidden">
        <button onClick={setconfirm} className="absolute right-2 text-red-300 top-0"><ion-icon name="close-outline"></ion-icon></button>
      </div>
      
      {
        users?.map((user,i)=>(
          <RequestPeople key={i} user={user} />
        ))
        }
      
    </div>
  )
}

export default RequestsShowPage
