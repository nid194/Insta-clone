import React, { useEffect, useState } from 'react'
import Userstory from '../../component/UserStoryLogo/UserStory'
import HomeC from '../../component/HomeComponent/homeC'
import Post from '../../component/Post/post'
import { useDispatch, useSelector } from 'react-redux'
import { reqUserPostAction } from '../../component/Redux/Post/PostAction'
import { findUserProfileAction } from '../../component/Redux/User/UserAction'
import ReelInHome from '../../component/ReelComponent/ReelInHome'
import { getFollowingUsersReelsAction } from '../../component/Redux/Reel/ReelAction'
// import { useDisclosure } from '@chakra-ui/react'

const Home = () => {
  // const {isOpen, onClose, onOpen} = useDisclosure()
  const dispatch = useDispatch()
  const[userIds, setUserIds] = useState([])
  const {findUserProfile} = useSelector((store) => store.user);  
  const {createPost,deletePost,postsOfUser} = useSelector((store) => store.post);
  const {getReelsOfUsers} =useSelector((store)=>store.reel)
  const token = localStorage.getItem("authToken")


  useEffect(() => {
  if (token) {
    const data = { token };
    dispatch(findUserProfileAction(data));
  }
}, [token, dispatch]);

  useEffect(()=>{
    if (!findUserProfile) return;
    const  newIds = findUserProfile?.following?.map((user)=>user.userId)
    setUserIds([findUserProfile?.userId,...newIds])
  },[findUserProfile])

  useEffect(()=>{
    if (userIds.length === 0) return;
     const data ={
      token,
      userIds:userIds.join(",")
    }
    dispatch(reqUserPostAction(data))
  },[userIds,token,createPost,deletePost,dispatch])

  useEffect(()=>{
    if (userIds.length === 0) return;
     const data ={
      token,
      userIds:userIds.join(",")
    }
    dispatch(getFollowingUsersReelsAction(data))
  },[userIds,token,dispatch])

  
  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[44%] px-10'>
          <div className='storyDiv flex space-x-2 border p-4 rounded-md jusiy-start w-full'>
            {
              [1,1,1,1].map((item) =><Userstory/>)
            }
          </div>
          <div className='space-y-10 w-full mt-10'>
             {postsOfUser && postsOfUser.length > 0 ? (
               postsOfUser.map((item) => <Post key={item.postId} post={item} />)
              ) : (
               <p>No post available</p>
              )}
          </div>
          <div className='space-y-10 w-full mt-10'>
             {getReelsOfUsers && getReelsOfUsers.length > 0 ? (
               getReelsOfUsers.map((item) => <ReelInHome key={item.reelId} reel={item} />)
              ) : (
               <p>No reel available</p>
              )}
          </div>
        </div>
        <div className='w-[25%]'>
          <HomeC />
        </div>
      </div>
    </div>
  )
}

export default Home