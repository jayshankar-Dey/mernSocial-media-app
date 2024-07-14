
import * as Yup from "yup"

export  const RegisterSchema=Yup.object({
    name:Yup.string().min(3).trim().required("name is required"),
    email:Yup.string().email().required("email is required")
   
})