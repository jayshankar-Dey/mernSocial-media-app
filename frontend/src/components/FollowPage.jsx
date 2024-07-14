/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import ShowRegisterPeople from "./ShowRegisterPeople"
import axiox from "axios"
import {useSelector} from "react-redux"
import socket from "../Socket"
const FollowPage = ({showRequest,setShwRequest}) => {
  const[search,setSearch]=useState('')
  const [users,setUsers]=useState()
  const{change}=useSelector(state=>state.change)
  
  const getAllUsers=async()=>{
    const res=await axiox.get(`/api/users?name=${search}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
   setUsers(res.data.user)

  }
  socket.on("request", (data)=>{
    console.log(data)
  })
  useEffect(()=>{
getAllUsers()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search,change])
  return (
    <div className={`h-[92vh] ${showRequest?" absolute  top-0 bottom-0 flex bg-white  right-0 w-full z-20":"hidden"} lg:flex  mt-2 rounded  w-[37%]   items-center flex-col gap-y-4 pt-2 overflow-scroll`}>
      <div className="relative text-2xl  w-full lg:hidden">
        <button onClick={setShwRequest} className="absolute right-2 text-red-300 top-0"><ion-icon name="close-outline"></ion-icon></button>
      </div>
      <div>
        <input placeholder="search.." value={search} onChange={(e)=>setSearch(e.target.value)} className=" w-full p-3 outline-none border"/>
      </div>
      {users == ""&& <h1 className="text-xl">User not found..</h1>}
      {
        users?.map((user,i)=>(
          <ShowRegisterPeople key={i} users={user}  />
        ))
        
      }
    
  
    </div>
  )
}

export default FollowPage
