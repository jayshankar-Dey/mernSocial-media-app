import { Container, Dialog } from "@mui/material"
import ChatPeople from "./ChatPeople"
import Message from "./Message"
import axios from "axios"
import { useEffect, useState } from "react"
//import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import socket from "../Socket"
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from "react-router-dom"


const Chat = () => {
 
 const User=useSelector(state=>state.user.user)
  const [friends,setFriends]=useState([])
  const [id,setId]=useState("")
  const [change,setChange]= useState("")
  const [user,setUser]=useState("")
 
  //const [user,setUser]=useState()
  const[message,setMessage]=useState("")
  const[messagedata,setMessageData]=useState([])
  ///getfriends
  const GetFriends=async()=>{
    const res=await axios.get(`/api/friends`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
     })
     setFriends(res.data.friends.friends)
    
  }
  ///sendmessage
  const sendMessage=async(e)=>{
    e.preventDefault()
      console.log(id)
      if(id && message){
        const res=await axios.post(`/api/create/chat`,{reciverID:id,message},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
         })
         console.log(res.data)
        setMessage("")
        socket.emit("sendMessage",res.data)
      }else{
        alert("please enter valide data")
      }
  }
  
///getmessage///
  const getMessage=async()=>{
   try {
   if(id){
    const res=await axios.get(`/api/get/chat/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
     })
     setMessageData(res.data.Convirsation.chat)
   }
   } catch (error) {
     console.log(error)
   }
  }
  useEffect(()=>{
    getMessage()
  },[id,message,change])
  useEffect(()=>{
    GetFriends()
  })
  socket.on("getmessage",data=>{
    setChange(data)
  })
 socket.on("onlineuser",data=>{
  console.log(data)
})
const[open,setOpen]=useState(false)

  return (
    <div className="bg-gray-200 w-full h-screen">
      <Container className="bg-white  p-2   ">
           <div className="h-screen flex">
           <div className={`md:w-72 md:flex h-[99%] relative bg-white overflow-y-auto hidden flex-col gap-y-5 `}>
           <div className="w-full h-16    ">
              <input type="text" placeholder="searchPeople" className=" w-full h-full p-4" />
            </div>
            {
              friends?(
                <>
                {
              friends?.map((friend,i)=>(
              <ChatPeople key={i} user={friend}  setid={setId} setUser={setUser}/>
               ))
              }
              <Dialog open={open} onClose={()=>setOpen(!open)}>
              <div className="w-72 h-screen p-2 flex flex-col gap-4">
              <div>
              <button className="md:hidden" onClick={()=>setOpen(false)}><ion-icon name="filter-outline"></ion-icon></button>
            </div>
              {friends?.map((friend,i)=>(
              <ChatPeople key={i} user={friend} setid={setId} setUser={setUser}/>
               ))}
              </div>
              </Dialog>
                </>
              ):(
                <>
               <div>
                No Friends
               </div>
                </>
              )
            }
            
            
           </div>
           <div className="w-full bg-gray-200 h-[99%]">
           
           {
           <div  className="p-2 flex justify-between items-center bg-white  h-16 ">
              <div>
              <button className="md:hidden" onClick={()=>setOpen(true)}><ion-icon name="filter-outline"></ion-icon></button>
            </div>
            <div className="flex gap-x-2 justify-center items-center">
            { id&&<img src={user?.profile?.url}  alt="" className="h-12 w-12 rounded-full object-cover object-center" />}
            <Link  to={`/profile/${user?._id}`}>{user?.name}</Link>
            </div>
          </div>
           }
           <ScrollToBottom className=" w-full p-1 h-[82.3%] overflow-y-auto"> 
           {
            id?(
              <>
             {
              messagedata?(
                <>
                 {
             messagedata?.map((message,i)=>(
                 <Message key={i} message={message} sender={User?._id==message?.senderID&&true} />
            ))
              }
                </>
              ):(
                <div className="flex text-4xl font-bold text-black h-full w-full justify-center items-center">
                Chat now..........
                </div>
              )
             }
              
              </>
            ):(
              <div className="text-black font-bold text-4xl flex justify-center items-center h-full">
              Chat Now
              </div>
            )
           }
           </ScrollToBottom>

           <form onSubmit={sendMessage} className={`bg-white ${id?"flex":"hidden"} w-full h-[9%]  justify-center items-center gap-x-2`}>
             <input placeholder="send message" type="text" value={message}
             onChange={(e)=>setMessage(e.target.value)} className="h-12 border-2 border-gray-500 w-[80%] px-4 rounded-full " />
             <button type="submit"  className=" text-blue-800 flex justify-center items-center text-3xl h-12 w-10   "><ion-icon name="send"></ion-icon></button>
           </form>

           </div>
           </div>
      </Container>
    </div>
  )
}

export default Chat
