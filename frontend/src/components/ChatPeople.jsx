/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"





const ChatPeople = ({user,setid,setUser}) => {
  
  return (
    <Link className="flex cursor-pointer justify-center items-center gap-1">
      <img src={user?.profile?.url} alt="" onClick={()=>{setid(user?._id)
        setUser(user)
       
      }} className=" h-10 w-10 rounded-full border"/>
      <div>
        <h1 onClick={()=>{setid(user?._id) 
           setUser(user)
         
           }} >{user?.name}</h1>
        <p className="text-sm text-blue-600"></p>
      </div>
    </Link>
  )
}

export default ChatPeople
