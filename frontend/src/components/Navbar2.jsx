/* eslint-disable react/prop-types */

import { Dialog } from "@mui/material"
import { useState } from "react"
import AddPost from "./AddPost"



const Navbar2 = ({setShwRequest,setconfirm}) => {
    const[open,setOpen]=useState(false)
  return (
    <div className="bg-white lg:w-[76%] md:w-[90%] w-full flex gap-x-4 justify-center items-center text-2xl p-1 *:text-center">
      <button className="lg:hidden" onClick={setShwRequest}><ion-icon name="person-add-outline"></ion-icon></button>
      <button className="md:hidden"  onClick={setconfirm}><ion-icon name="person-remove-outline"></ion-icon></button>
      <button onClick={()=>setOpen(!open)}><ion-icon name="add-circle-outline"></ion-icon></button>
      <Dialog open={open} onClose={()=>setOpen(!open)}>
      <AddPost setOpen={()=>setOpen(!open)} />
      </Dialog>
    </div>
  )
}

export default Navbar2
