import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from "react-icons/fa";
import './userCardStyle.css'


const UserCard = ({post}) => {
  
  return (
    <div className='p-1'>
        <div className='post w-60 h-60 relative'>
            <img className='cursor-pointer w-full h-full object-cover' src={post?.imgUrl || "https://cdn.pixabay.com/photo/2023/10/06/08/16/lavender-8297714_960_720.jpg"} alt="card" />
            <div className="overlay">
               <div className='overlay-text flex justify-between items-center w-full h-full px-4 py-2'>
                    <div className="flex items-center gap-2">
                     <AiFillHeart/>
                     <span>{post?.likedByUser?.length || 0}</span>
                    </div>
                   <div className="flex items-center gap-2"> 
                      <FaComment />
                      <span>{post?.comments?.length || 0}</span>
                   </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard