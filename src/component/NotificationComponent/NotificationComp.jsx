import React, { useEffect } from 'react'
import Home from '../../Pages/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotificationsAction, likeAndCommentOnPostAction } from '../Redux/Notification/NotificationAction'


const NotificationComp = ({onClose}) => {

 const {notifications,likesAndCommentsOfPost} = useSelector((store)=>store.notification) 
 console.log("notification:",notifications)
 console.log("post related:",likesAndCommentsOfPost)
 
 const token = localStorage.getItem("authToken")
 const dispatch = useDispatch()

 useEffect(()=>{
   if(!token){
      console.log("token is not available")
   }
   dispatch(fetchNotificationsAction({token}))
   // console.log("-------------------------------inside notify comp------------------",token)
 },[dispatch,token])

 useEffect(()=>{
   if(!token){
      console.log("token is not available")
      return
   }
   dispatch(likeAndCommentOnPostAction({token}))
 },[token,dispatch])

  return (
    <div  className="flex h-screen">
        <div className='w-[420px] px-3 py-5 overflow-y-auto border-r'>
           <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg font-bold italic">Notifications</h1>
              <button onClick={onClose} className="text-xl font-medium">✕</button>
           </div>
            <div className='mb-10 flex items-start flex-col'>
               <p className='font-semibold'>Follow requests</p>
                {notifications?.length>0 && notifications.map((n) => (
                 <div key={n.notificationId} className="flex gap-3 my-4">
                    {/* <img src={n.user.userImage} className="w-10 h-10 rounded-full" alt="notification by user"/> */}
                    {n.type === "FOLLOW" && (
                    <p><span className="font-semibold"> {n.user.username} </span>{" "} started following you.</p>
                   )}
                 </div>
                 ))}
            </div>
            <div className='mb-[80%] flex items-start font-semibold'>
               This week
               {likesAndCommentsOfPost?.length>0 && likesAndCommentsOfPost.map((n) => (
                 <div key={n.notificationDto.notificationId} className="flex gap-3 my-4">
                    {n.notificationDto.type === "LIKE_POST" && (
                    <p><span className="font-semibold">{n.notificationDto.sender?.username}</span>{" "} liked your post.</p>
                   )}
                   {n.type === "COMMENT_POST" && (
                    <p><span className="font-semibold">{n.sender?.username}</span>{" "} commented on your post.</p>
                   )}
                 </div>
               ))}
            </div>
            <div className='mb-10 flex items-start font-semibold'>
               This month
            </div>
            <div className='mb-10 flex items-start font-semibold'>
               Earlier
            </div>
        </div>
       <div className="flex-1 overflow-y-auto">
        {/* <Home /> */}
       </div>
    </div>
  )
}

export default NotificationComp