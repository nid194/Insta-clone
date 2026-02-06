import React,{useState} from 'react'
import { SiFramework } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa"; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findUserProfileAction, followUserAction,unFollowUserAction} from '../Redux/User/UserAction';
import MessageView from '../Message/MessageView';


const UserDetail = ({ user,mode = "full" }) => {
    const { post } = useSelector((store)=> store)
    const dispatch = useDispatch()
    const loggedinUser = useSelector((store)=> store.user.findUserProfile)
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")

    const isFollowing = loggedinUser?.following?.some((f) => f.userId === user?.userId);
    
    const [isFollowingLocal, setIsFollowingLocal] = useState(isFollowing);
    const [isMuted, setIsMuted] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
   
   const handleFollowClick = () => {
     setIsFollowingLocal(true)
       dispatch(followUserAction({ token, followUserId:user.userId }))
       dispatch(findUserProfileAction({token}))
   }

    

   const handleUnfollow = () => {
    setIsFollowingLocal(false)
    dispatch(unFollowUserAction({ token, unfollowUserId:user.userId }))
    dispatch(findUserProfileAction({token}))
    setShowDropdown(false);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    setShowDropdown(false);
  };

  return (
    <div className={`py-10 ${mode === "side" ? "w-[35%]" : "w-full"}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
                <img className='w-32 h-32 rounded-full object-cover' src={user?.profileImg || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="user"/>
                {user?.bio && (
                  <p className="font-thin text-sm mt-3 text-center">{user.bio}</p>
                )}
            </div>
                    <div className="text-left">
                       <p className='flex items-center font-bold text-[20px]'>{user?.username}
                         <span className='ml-2 text-[22px]'> <SiFramework /> </span> 
                       </p>
                       <p className='text-[13px]'>{user?.name}</p>
                       <div className='flex space-x-6 mt-4'>
                         {user.userId === loggedinUser.userId ?
                           (<div>
                             <span className='font-semibold'>{post.getAllPosts?.length || 0}</span> posts
                           </div>
                           ):(
                            <div>
                             <span className='font-semibold'>{post.searchedUserPosts?.length || 0}</span> posts
                           </div>
                           )
                          }
                         <div>
                           <span className='font-semibold'>{user?.follower?.length || 0}</span> followers
                         </div>
                         <div>
                           <span className='font-semibold'>{user?.following?.length || 0}</span> following
                         </div>
                       </div>
                     </div>
         </div>
         { user?.userId === loggedinUser.userId ?
          (<div className='flex space-x-10 ml-[12%]'>
            <p>{user?.userName}</p>
            <button onClick={() => navigate("/account/edit")}>Edit Profile</button>
          </div>
          ):(
            <div className='flex items-center justify-content pl-[30%] mt-3'>
              {!isFollowingLocal ? (
                <button
                  onClick={handleFollowClick}
                  className="mt-3 px-20 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Follow
                </button>
              ) : (
                <div className="relative mt-3">
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)} className="flex items-center px-20 py-2 bg-gray-200 rounded hover:bg-gray-300">Following 
                    <FaChevronDown className="ml-2 text-sm"/></button>
                  {showDropdown && (
                    <div className="absolute mt-2 w-65 bg-white border rounded-lg shadow-lg z-10">
                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-blue-600 font-semibold cursor-default">
                        Unmute
                      </button>
                      <button
                        onClick={handleMuteToggle}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                        {isMuted ? "Unmute" : "Mute"}
                      </button>
                      <button
                        onClick={handleUnfollow}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600">
                        Unfollow
                      </button>
                    </div>
                  )}
                </div>
              )}
               <div>
                <button className='border-none px-20 py-2 rounded' onClick={() => <MessageView selectedUser={isFollowing} currentUser={loggedinUser}/>}>
                  Message
                </button>
              </div>
            </div>  
          )}
    </div>
  )
}

export default UserDetail