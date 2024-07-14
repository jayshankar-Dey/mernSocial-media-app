/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Navbar2 from "./Navbar2"
import Photo from "./Photo"
import axios from "axios"

const PostShowPage = ({setShwRequest,setconfirm}) => {
 
  const [post,setAllPost]=useState([])
const getAllpost=async()=>{
const res=await axios.get('/api/get/post',{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
setAllPost(res.data.post)

}
useEffect(()=>{
  getAllpost()
})
  return (
    <div className="h-[92vh] w-fit sm:w-full gap-y-3  mt-2 rounded flex flex-col border  items-center overflow-scroll  ">
      <Navbar2 setShwRequest={setShwRequest} setconfirm={setconfirm}/>
      {
        post.map((post,i)=>(
          <Photo key={i} post={post}/>
        ))
      }
     
     
    </div>
  )
}

export default PostShowPage
