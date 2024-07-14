/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


const Notification = ({notic}) => {
    
  return (
    <Link to={`/profile/${notic?.userId._id}`} className="text-blue-800 box-border p-1 rounded-md shadow-md cursor-pointer border-b border-gray-300 bg-gray-100">
      <div className="flex items-center gap-x-3">
        <div>
            <img src={notic?.userId?.profile.url} alt="" className="h-10 rounded-full w-10"/>
            </div>
        <div>
          <h4 className="text-sm font-semibold">{notic?.userId.name}</h4>
        </div>
      </div>

      <div className="flex justify-between">
      <h3 className="text-sm">{notic.message}</h3>
     
      </div>
    </Link>
  )
}

export default Notification
