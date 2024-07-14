/* eslint-disable no-unused-vars */
import { Button, Input, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useFormik } from 'formik';
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate()
  const [error,setError]=useState("")

    const {handleSubmit,handleChange} = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: async(values) => {
          const res= await axios.post('/api/login',values)
          try {
           if(res.data.success){
             toast.success(res.data.message)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",res.data.user)
             navigate('/')
             setError("")
           }else{
             setError(res.data.message)
           }
          } catch (error) {
            console.log(error)
          }
        },
      });
    
  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-gray-50">

      <form onSubmit={handleSubmit}  className="flex flex-col gap-y-3 w-80 bg-white p-3 rounded-md border shadow-md">
      {error&&<div className="w-full p-3 my-2 bg-red-50 text-red-500 text-sm rounded-md">
           <h1><ion-icon name="alert-outline"></ion-icon>{error}</h1>
        </div>}
        <Input label="Enter Email" type="email" onChange={handleChange} name="email" />
        
        <Input label="Enter Password" type="password"   onChange={handleChange} name="password" />
       
        <div className="flex justify-between items-center">
        <Link  to={'/register'} className="text-sm ">Dont have any account <span className="text-blue-500">Register</span></Link>
        <Button variant="outlined"  type="submit" size="sm" className="float-right">Login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login
