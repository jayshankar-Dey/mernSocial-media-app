/* eslint-disable no-unused-vars */
import { Button, Container, Dialog, ImageList, ImageListItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import { setChange } from "../redux/changSlice"
import { CircularProgress } from "@mui/material"
import ShowFriends from "./ShowFriends"
import toast from "react-hot-toast"
const Profile = () => {
    const {user} =useSelector(state=>state.user)
    const[edditOpen,setedditOpen]=useState(false)
    const[showFriend,setShowFriends]=useState(false)
    //const userId=localStorage.getItem("user")
    const[open,setOpen]=useState(false)
    const[profile,setProfile]=useState()
    const exiext=profile?.friends.filter((data)=>data._id==user?._id).length
    const[seeImg,setSeeimg]=useState(false)
    const[loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [des,setdes]=useState("")
    const [file,setFile]=useState()
    const dispatch=useDispatch()

    const params=useParams()
    const{id}=params
   ///getprofile
    const getProile=async()=>{
     await axios.get(`/api/profile/${id?id:""}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
     }).then((res)=>{
      dispatch(setChange(res.data.message))
      setProfile(res.data.user)
     })
    
    }
   
    const getUserProile=async()=>{
      const res=await axios.get(`/api/profile`,{
       headers:{
         Authorization:`Bearer ${localStorage.getItem("token")}`
       }
      })
     setName(res.data.user.name)
     setdes(res.data.user.des)
     
     }
    useEffect(()=>{
     getProile()
    },[id])

     ///addrequest
  const addRequest=async(id)=>{
    dispatch(setChange(id))
    const res=await axios.post(`/api/request`,{id},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch(setChange(res.data.message))
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
  }

    //update profile
    const updateProfile=async(e)=>{
       e.preventDefault()
       const formData=new FormData()
       formData.append("name",name)
       formData.append("des",des)
       formData.append("file",file)
       setLoading(true)
       const res =await axios.put(`/api/profile/update`,formData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
       })
       dispatch(setChange(res.data.message))
       setLoading(false)
       setOpen(!open)
    }

    ////eddit part
  const [Title, setTitle] = useState("");
  const [File, setfile] = useState("");
  const [Id, setid] = useState("");
  const [postimg, setPostimg] = useState("");
  const formdata = new FormData();
  formdata.append("title", Title);
  formdata.append("file", File);
  //get single post
  const getSinglePost = async (id) => {
    const res = await axios.get(`/api/get/post/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    res.data.post.forEach((element) => {
      setTitle(element?.title);
      setPostimg(element?.image.url);
      setid(element?._id);
    });
   
  };
  ///update post
  const updatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.put(`/api/update/post/${Id}`, formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setLoading(false);
    setedditOpen(false);
    toast.success(res.data.message);
  };

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
  return (
    <Container>
       <div className=" pt-3">
         <Link to={"/"}><Button size="small" variant="outlined">Back</Button></Link>
        </div>   
      <div className=" mx-auto w-full md:w-[60%] mt-5 flex md:flex-row flex-col items-center gap-x-3 justify-between  ">
        
        <div className="h-32 w-32 rounded-full border p-1 relative">
           {profile?.profile?.url?<img src={profile.profile.url} onClick={()=>{
            setSeeimg(!seeImg)
            setPostimg(profile?.profile?.url)
           }} alt="" className="w-full cursor-pointer h-full object-cover object-center rounded-full" />:<img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="" className="w-full h-full object-cover object-center rounded-full" />

}

           {user?._id.toString() == profile?._id.toString()&&<button onClick={()=>{
              setOpen(!open)
              getUserProile()
              }}  title="eddit profile" className="absolute py-1 px-2 bg-white rounded-full top-16 -right-3 border shadow-md"><ion-icon name="create-outline"></ion-icon></button>}
        </div>
        {/* //edit */}
        <Dialog open={open} onClose={()=>setOpen(!open)}>
            <form onSubmit={updateProfile}  className="w-96 h-96 bg-white border shadow-lg flex flex-col gap-y-3 p-3">
               
                <TextField onChange={(e)=>setName(e.target.value)} label='Eddit Name' focused value={name}/>

                <TextField onChange={(e)=>setdes(e.target.value)}  label='Eddit des' focused value={des}/>

                <TextField onChange={(e)=>setFile(e.target.files[0])}  type="file" label='Eddit Profile Pic' focused/>
                {profile?.profile?.url?<img src={profile.profile.url} className="h-14 w-14 rounded-full" alt="" />:<img src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" className="h-14 w-14 rounded-full" alt="" />}
                {
                 loading?<button><CircularProgress/></button>:<Button variant="outlined" type="submit" >Save Change</Button>
                }
            </form>
        </Dialog>
        {/* //end eddit */}
        <Dialog open={showFriend} onClose={()=>setShowFriends(!showFriend)} >
          <div className="h-screen bg-gray-100 w-96 flex flex-col gap-y-1  overflow-scroll">
            {profile?.friends.map((data,i)=>(
               <ShowFriends key={i} user={data} close={()=>setShowFriends(!showFriend)} />
             
            ))}
          {
            profile?.friends.length==0&&<h1 className="text-xl text-center p-3">Please Add friend...</h1>
          }
          </div>
        </Dialog>
        {/* ///show all friends */}
        <div className="md:w-[80%] px-2">
            <h1 className="text-xl mt-4 font-semibold">{profile?.name}</h1>
           
            <p className="text-sm font-semibold text-gray-500">{profile?.des} </p>
            <div className="flex gap-x-3 m-2 mt-4 *:font-semibold">
                <button className=" p-2 " onClick={()=>setShowFriends(!showFriend)}>friends({profile?.friends.length})</button>
                <button className="p-2">Post({profile?.post.length})</button>
                {
                  exiext ?"":(
                    <>
                    {user?._id.toString() == profile?._id.toString()?"":(<>
                  { profile?.request.includes(user?._id)?<Button variant="contained"    ><span className="text-[12px]" onClick={()=>{
                 addunRequest(profile?._id)
             
               }}>Request</span></Button>:<Button variant="contained" size="small" onClick={()=>{
              addRequest(profile?._id)
              
               }} ><span className="text-[12px]">Add friend</span></Button>}
                </>)}
                    </>
                  )
                }
            </div>
        </div>
      </div>

{/* ///update post */}
<div className="mx-auto w-fit mt-3 ">
<Dialog open={edditOpen} onClose={()=>setedditOpen(!edditOpen)}>
      <form onSubmit={updatePost} className="flex flex-col gap-y-3  p-3 w-96">
        <TextField value={Title} label="title" className="w-full" onChange={(e)=>setTitle(e.target.value)}/>
        <TextField type="file" className="w-full" onChange={(e)=>setfile(e.target.files[0])}/>
        <img src={postimg} className="h-14 w-14 rounded-full" alt="" />
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
    
      <ImageList className="w-96 h-[30rem] *:cursor-pointer" cols={3} rowHeight={164}>
  
    {/* <ImageListItem >
      <img
        srcSet={`https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg?q=tbn:ANd9GcR6aQ32XjTXDMEP7qPdL4u1wnks7ORR3vVB9m4U1yhkJA&s?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg?q=tbn:ANd9GcR6aQ32XjTXDMEP7qPdL4u1wnks7ORR3vVB9m4U1yhkJA&s?w=164&h=164&fit=crop&auto=format`}
        alt=""
        loading="lazy"
      />
    </ImageListItem> */}
   {
    profile?.post.length==0&&<h1>you have no post... </h1>
   }

   {
      profile?.post.map((post,i)=>(
        <div key={i} className="relative">
      <img src={post.image.url} alt="" onClick={()=>{
        setPostimg(post.image.url)
        setSeeimg(!seeImg)
      }} />
     {
      profile?._id.toString() ==user?._id.toString()&& <button onClick={()=>{
        setedditOpen(!edditOpen)
        getSinglePost(post?._id);
        setid(post?._id)
      }} className="absolute top-1 right-2 text-white cursor-pointer "><ion-icon name="create-outline"></ion-icon></button>
     }
    
        {
      profile?._id.toString() ==user?._id.toString()&& <button onClick={()=>{
        deletePost(post?._id)
      }} className="absolute top-1 left-2 text-white cursor-pointer "><ion-icon name="trash-outline"></ion-icon></button>
     }
      
    </div>
      ))
    }
   
   
   <Dialog open={seeImg} onClose={() =>setSeeimg(!seeImg)}>
         <div className="md:w-fit md:h-fit w-96 h-96">
         <img src={postimg} alt=""  className=" w-full h-full object-cover object-center"/>
         </div>
        </Dialog>
   
 
</ImageList>

</div>
      {/* ///photos */}
    </Container>
  )
}

export default Profile
