/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import CommentPeople from "./CommentPeople";
import { Button, Dialog, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import socket from "../Socket";
const Photo = ({ post }) => {
  const { image, title,Like,_id,comments } = post;
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);
  const [edditOpen, setEdditOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [showComment, setShowAllComment] = useState(false);
  const [loading, setLoading] = useState();
  const [Title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [id, setId] = useState("");
  const[comment,setComment]=useState("")
  const [postimg, setPostimg] = useState("");
  const formdata = new FormData();
  formdata.append("title", Title);
  formdata.append("file", file);
  const getSinglePost = async (id) => {
    const res = await axios.get(`/api/get/post/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    res.data.post.forEach((element) => {
      setTitle(element?.title);
      setPostimg(element?.image.url);
      setId(element?._id);
    });
  };
  ///update post
  const updatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.put(`/api/update/post/${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setLoading(false);
    setEdditOpen(false);
    toast.success(res.data.message);
  };

  ///deletepost
  const deletePost=async(id)=>{
    setLoading(true)
    const res=await axios.delete(`/api/delete/post/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    setLoading(false)
    toast.success(res.data.message)
  }
  //like post
  const LikePost=async(id)=>{
    const res=await axios.post(`/api/like/post`,{id},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    toast.success(res.data.message)
  }

  //UNlike post
  const UnLikePost=async(id)=>{
    const res=await axios.post(`/api/unlike/post`,{id},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    toast.success(res.data.message)
  }
  
  ///comments///////////////
const commentSubmit=async(e)=>{
e.preventDefault()
const res=await axios.post(`/api/comment/post`,{_id,comment},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
setComment("")
toast.success(res.data.message)
  }
  ///addNotifacition
  const addNotifacition=async(senderId)=>{
    const message="Like your post"
    const res=await axios.post(`/api/add/Notifacion`,{senderId,message},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    socket.emit("sendNotification",res.data.Notice)
  }
  return (
    <div className="bg-white p-2 rounded shadow  md:w-[30rem] w-full">
      {/* profile */}
      <Link
        to={`/profile/${post?.user?._id}`}
        className="my-2 flex gap-x-2 items-center cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full overflow-hidden">
          {user?.profile?.url ? (
            <img
              src={post?.user?.profile?.url}
              alt=""
              className="object-cover object-center w-full h-full rounded-full "
            />
          ) : (
            <img
              src="https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-pripicart-620337.jpg&fm=jpg"
              alt=""
              className="object-cover object-center w-full h-full rounded-full "
            />
          )}
        </div>
        <div>
          <h1 className="font-semibold text-sm">{post?.user?.name}</h1>
        </div>
      </Link>
      {/* profile */}
      <div className="w-full h-80 border flex items-center justify-center cursor-pointer relative ">
        {/* ///edit button */}
        {post?.user?._id.toString() == user?._id.toString() && (
          <button
            className="absolute top-1 right-2 text-white cursor-pointer "
            onClick={() => {
              setEdditOpen(!edditOpen);
              getSinglePost(post?._id);
            }}
          >
            <ion-icon name="create-outline"></ion-icon>
          </button>
        )}

        {/* ///edit button */}

        {/* ///delete button */}
        {
           loading?<button className="absolute top-1 left-2 text-white cursor-pointer "><CircularProgress/></button>:(<>
            {post?.user?._id.toString() == user?._id.toString() && (
          <button
            className="absolute top-1 left-2 text-white cursor-pointer "
            onClick={() => {deletePost(post?._id)}}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        )}
           </>)
        }
       

        {/* ///delete button */}




        {/* ///eddit post */}
        <Dialog open={edditOpen} onClose={() => setEdditOpen(!edditOpen)}>
          <form
            onSubmit={updatePost}
            className="flex flex-col gap-y-3  p-3 w-96"
          >
            <TextField
              label="title"
              value={Title}
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="file"
              className="w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="w-full h-fit">
              <img
                src={postimg}
                alt=""
                className="w-full h-fit object-cover object-center"
              />
            </div>
            {loading ? (
              <Button>
                <CircularProgress />
              </Button>
            ) : (
              <Button variant="outlined" type="submit">
                Save Change
              </Button>
            )}
          </form>
        </Dialog>
        {/* ///eddit post */}





        {image ? (
          <img
            src={image.url}
            onClick={() => {
              setImg(image.url);
              setOpen(!open);
            }}
            alt=""
            className="object-cover object-center w-full h-full "
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-pripicart-620337.jpg&fm=jpg"
            alt=""
            className="object-cover object-center w-full h-full "
          />
        )}
        <Dialog open={open} onClose={() => setOpen(!open)}>
          <img src={img} alt="" />
        </Dialog>
      </div>
      <div className="text-sm text-gray-600 my-1">
        <p>{title}</p>
      </div>
      <div className="text-2xl flex gap-x-3 pt-4">
        {
          Like?.includes(user?._id)?<button onClick={()=>UnLikePost(post?._id)} className="text-red-600 relative"><ion-icon name="heart"></ion-icon>
          <span className="text-black text-sm absolute z-10 left-2 -bottom-2">{Like.length}</span>
          </button>: <button className="relative" onClick={()=>{
            LikePost(post?._id)
            addNotifacition(post?.user?._id)
          }} ><ion-icon name="heart-outline"></ion-icon>
          <span className="text-black text-sm absolute z-10 left-2 -bottom-2">{Like.length}</span>
           </button>
        }
        <button className="relative">
          <ion-icon name="chatbubble-outline"></ion-icon>
          <span className="text-black text-sm absolute z-10 left-2 -bottom-2">{comments.length}</span>
        </button>
      </div>
      <form onSubmit={commentSubmit} className="flex items-center gap-x-4  pt-3">
        <input
          type="text"
          className="bg-gray-100 rounded-full p-2"
          placeholder="Comment.."
          onChange={(e)=>setComment(e.target.value)}
          value={comment}
        />
        <button  type="submit" className="text-3xl  flex text-center text-gray-500">
          <ion-icon name="send"></ion-icon>
        </button>
      </form>
      <div
        className="p-2 text-sm cursor-pointer my-3 w-96"
        onClick={() => setShowAllComment(!showComment)}
      >
        <h3>
          <ion-icon name="eye"></ion-icon> See All Coments..
        </h3>
      </div>
      {
        comments.length >0&&<div
        className={`flex flex-col gap-y-1 mt-2 overflow-hidden ${
          showComment ? "h-fit" : " h-24"
        }`}
      >
        {
          comments?.map((comment,i)=>(
            <CommentPeople  key={i} coment={comment}/>
          ))
        }
       
       
      </div>
      }
    </div>
  );
};

export default Photo;
