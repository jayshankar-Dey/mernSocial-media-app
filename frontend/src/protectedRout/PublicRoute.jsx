/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Navigate } from "react-router-dom"

const PublicRoute = ({children}) => {
 const token=localStorage.getItem("token")
 if(token){
    return <Navigate to={'/'}/>
 }else{
    return children
 }
}

export default PublicRoute
