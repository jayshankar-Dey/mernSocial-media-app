/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


const ShowFriends = ({user,close}) => {
  return (
    <>
    <Link to={`/profile/${user?._id}`} onClick={close} className="flex gap-x-3 items-center cursor-pointer bg-white border p-2  ">
      <div  className="h-14 w-14 rounded-full">
    {user?.profile?<img src={user.profile.url} alt=""  className="h-full w-full object-cover object-center rounded-full"/>:<img src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt=""  className="h-full w-full object-cover object-center rounded-full"/>}
      </div>
      <div>
        <h1>{user?.name}</h1>
      </div>
    </Link>
    
    </>
  )
}

export default ShowFriends
