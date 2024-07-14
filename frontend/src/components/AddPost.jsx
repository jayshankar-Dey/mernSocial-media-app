import { Button, TextField } from "@mui/material"
import axios from "axios"
import {toast} from 'react-hot-toast'
import { useState } from "react"
import { CircularProgress } from "@mui/material"
// eslint-disable-next-line no-unused-vars, react/prop-types
const AddPost = ({setOpen}) => {
  const[title,setTitle]=useState("")
  const[file,setFile]=useState("")
  const[loading,setLoading]=useState(false)
  const formdata=new FormData()
  formdata.append("title",title)
  formdata.append("file",file)
 const addPost=async(e)=>{
  e.preventDefault()
  setLoading(true)
  const res=await axios.post('/api/create/post',formdata,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  setLoading(false)
  setOpen()
  toast.success(res.data.message)
 }
  return (
    <form onSubmit={addPost} className="lg:w-[600px] h-96 relative flex flex-col gap-y-4 justify-center p-5 ">
      <span onClick={setOpen} className="absolute top-2 cursor-pointer right-2 text-2xl text-red-300" ><ion-icon name="close-outline"></ion-icon></span>

      <TextField label="title" variant="filled" onChange={(e)=>setTitle(e.target.value)}/>
      <TextField type="file" variant="filled" onChange={(e)=>setFile(e.target.files[0])}/>
      
      {
        loading?<Button><CircularProgress/></Button>:<Button variant="contained" type="submit">Uplode</Button>
      }
   
    </form>
  )
}

export default AddPost
