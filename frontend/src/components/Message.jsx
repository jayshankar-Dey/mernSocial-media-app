/* eslint-disable react/prop-types */

//import { useState } from "react"
//import { useSelector } from "react-redux"


const Message = ({message,sender}) => {
  // const {user}=useSelector(state=>state.user)
  
  return (
    <>
      <div className={`flex w-full  font-semibold p-2 ${sender?"justify-end  text-white ":"justify-start"} `}>
                <h1 className={` p-3  ${sender?"bg-green-400":"bg-white"} rounded-full border shadow`}>{message.message}</h1>
      </div>
    </>
  )
}

export default Message
