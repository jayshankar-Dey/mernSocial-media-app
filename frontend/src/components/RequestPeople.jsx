/* eslint-disable react/prop-types */
import { Button } from "@mui/material"
import axios from "axios"
import {useDispatch} from "react-redux"
import { setChange } from "../redux/changSlice"
import { Link } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
const RequestPeople = ({user}) => {
  
  // eslint-disable-next-line no-unused-vars
  const{profile,name,_id}=user
  const dispatch=useDispatch()
  // eslint-disable-next-line no-unused-vars
  ////confirm request
  const confirm_request=async(id)=>{
      const res=await axios.post('/api/confirm/request',{id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(setChange(res.data.message))
console.log(res.data.message)
  }

  ///calcle request////
  const cancleRequest=async(id)=>{
    const res=await axios.post('/api/Cancle/request',{id},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch(setChange(res.data.message))
  }
  return (
    <div className="flex gap-x-4 border-b p-1">
      <Link to={`/profile/${_id}`} className="h-14 w-14 p-1 rounded-full overflow-hidden flex items-center gap-x-5">
        {profile?.url?<img src={profile?.url} alt=""  className="w-full h-full object-cover object-center rounded-full"/>:<img src="https://pics.craiyon.com/2023-06-20/89f79a8dee744596981e7417b8a7ea1d.webp" alt=""  className="w-full h-full object-cover object-center rounded-full"/>}
      </Link>
      <div>
        <Link to={`/profile/${_id}`} className="font-semibold text-sm my-1">{name}</Link>
        <div className="flex gap-x-2">
            <button className="bg-gray-100 px-3 border border-gray-200 shadow rounded" onClick={()=>cancleRequest(_id)}>Delete</button>
            <Button variant="contained" size="small" onClick={()=>confirm_request(_id)} >Conferm</Button>
        </div>
      </div>
    </div>
  )
}

export default RequestPeople
