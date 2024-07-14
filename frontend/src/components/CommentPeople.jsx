/* eslint-disable react/prop-types */
import {useSelector} from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"
const CommentPeople = ({coment}) => {
  const{_id}=coment
 const{user}=useSelector(state=>state.user)
 const deleteComment=async()=>{
  const res=await axios.post(`/api/delete/comments`,{_id},{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
  
  toast.success(res.data.message)
 }
 
  return (
    <>
   <div className=" p-2">
      <div className="flex gap-x-3 items-center  mt-1  relative">
        {
          coment?.user?.profile?<img src={coment?.user?.profile.url} alt="" className="h-10 w-10 rounded-full" />:<img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" className="h-12 w-12 rounded-full" />
        }
        <h1>{coment?.user?.name}</h1>
     {
      user?._id == coment?.user?._id&&<span onClick={deleteComment} className="absolute top-2 right-1 cursor-pointer text-red-300"><ion-icon name="close-circle-outline"></ion-icon></span>
     }
      </div>
      <div className="w-96 text-sm text-gray-700 mt-2">
        <h1 className="text-sm sm:ml-12">{coment?.comment}</h1>
      </div>
    </div>

    </>
  )
}

export default CommentPeople
