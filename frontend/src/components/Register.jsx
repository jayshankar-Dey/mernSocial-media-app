/* eslint-disable no-unused-vars */
import { Button, Input, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useFormik } from 'formik';
import { RegisterSchema } from "../validation/RegisterValidation";
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate=useNavigate()
const [error,setError]=useState("")
    const {handleSubmit,handleChange,touched,errors} = useFormik({
        initialValues: {
          name:'',
          email: '',
          password: '',
          cnfpassword: '',
        },
        validationSchema:RegisterSchema,
        onSubmit:async (values) => {
           const res= await axios.post('/api/register',values)
           try {
            if(res.data.success){
              toast.success(res.data.message)
              navigate('/login')
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
     {error&& <div className="w-full p-3 my-2 bg-red-50 text-red-500 text-sm rounded-md">
            <h1><ion-icon name="alert-outline"></ion-icon>{error}</h1>
        </div>
}
        <Input label="Enter Name" name="name" onChange={handleChange} />
        <Typography className="text-sm text-red-400">{errors.name && touched.name&&errors.name}</Typography>

        <Input label="Enter Email" type="email" name="email" onChange={handleChange}/>
        <Typography className="text-sm text-red-400">{errors.email && touched.email&&errors.email}</Typography>

        <Input label="Enter Password" type="password" name="password" onChange={handleChange}  />
        
        <Input label="Enter CnfPassword" type="password" name="cnfpassword" onChange={handleChange}  />
       
        
        <div className="flex justify-between items-center">
        <Link  to={'/login'} className="text-sm "> have any account <span className="text-blue-500 underline">Login</span></Link>
        <Button variant="outlined"  size="sm" className="float-right" type="submit">Register</Button>
        </div>
      </form>
    </div>
  )
}

export default Register
