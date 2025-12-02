import React,  { useEffect,useState } from "react"
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import './post.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import CommentModal from '../Comment/commentModal';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { likePostAction, savePostAction, unlikePostAction, unsavePostAction } from '../Redux/Post/PostAction';
import { isPostLikedByUser, isSavedPost } from '../../config/Logic';
import { useNavigate } from "react-router-dom";


const Post = ({post}) => {

  const {findUserProfile} = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[showDropDown, setShowDropDown] = useState(false);
  const[isPostLiked, setIsPostLiked] = useState(false)
  const[isSaved, setIsSaved] = useState(false)
  const{isOpen, onOpen, onClose} = useDisclosure()
  const token = localStorage.getItem("authToken")
  
    const data = {
    token,
    postId: post?.postId
  }
  
  const handlePostLike = () =>{
    setIsPostLiked(true)
    dispatch(likePostAction(data))
    //  console.log("liked post action",data)
  }
  const handlePostUnlike = () =>{
    setIsPostLiked(false)
    dispatch(unlikePostAction(data))
  }
  const handleClick = () =>{
     setShowDropDown(!showDropDown)
  }
  const handleSaved = () =>{
    setIsSaved(true);
    dispatch(savePostAction(data))
  }

  const handleUnsaved = () =>{
    setIsSaved(false)
    dispatch(unsavePostAction(data))
    // console.log("------------------------",data)
  }

  const handleOpenComment = () =>{
    navigate(`/comment/${data.postId}`);
    onOpen()
  }

  useEffect (()=>{
    if (!post || !findUserProfile?.userId) {
       console.log("post of user:",post)
       return;
    }
       setIsPostLiked(isPostLikedByUser(post,findUserProfile.userId)) 
       setIsSaved(isSavedPost(findUserProfile,post.postId))
  },[post, findUserProfile]);
  return (
    <div>
        <div className='border rounded-md w-full'>
            <div className='flex justify-between items-center w-full py-4 px-5'>
                <div className='flex items-center'>
                    <img className='h-12 w-12 rounded-full' src={post.user?.userImage || 'https://cdn.pixabay.com/photo/2023/09/22/07/02/red-8268266_1280.jpg'} alt=''/>
                    <div className='pl-2'>
                      <p className='font-semibold text-sm'>{post.user.username}</p>
                      <p className='font-thin text-sm text-left'>{post.location}</p>
                    </div>
                </div>
                <div className='dropdown'>
                  <BsThreeDots className='dots' onClick={handleClick}/>
                  <div className='dropdown-content'>
                    { 
                      showDropDown && <p className='bg-black text-white py-1 px-4 rounded md cursor-pointer'>Delete</p>
                    }
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <img src={post?.imgUrl} alt='postImg'/>
            </div>
            <div className='flex justify-between items-center w-full px-5 py-4'>
              <div className='flex items-center space-x-2'>
                {
                    isPostLiked? <AiFillHeart className='text-2xl hover:opacity-70 cursor-pointer text-red-500' onClick={handlePostUnlike}/> : <AiOutlineHeart className='text-xl hover:opacity-50 cursor-pointer' onClick={handlePostLike}/>
                }
                <FaRegComment onClick={handleOpenComment} className='text-xl hover:opacity-50 cursor-pointer'/>
                <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'/>
              </div>
              <div>
                { isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnsaved}/>:<BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSaved}/>}
              </div>
            </div>
            <div className='w-full py-2 px-5 text-left'>
              {post?.likedByUser?.length>0 && <p>{post?.likedByUser?.length} likes</p>}
              {post?.comment?.length>0 && <p className='opacity-50 py-2 cursor-pointer'>view all {post?.comment?.length}</p>}
            </div>
            <div className='border border-t w-full'>
              <div className='flex w-full items-center px-5'>
                <BsEmojiSmile/>
                <input className='commentInput' type="text" placeholder='add a comment..'/>
              </div>
            </div>
        </div>
        <CommentModal handlePostLike={handlePostLike} onClose={onClose} post={post} isOpen={isOpen} handleSaved={handleSaved} isPostLiked={isPostLiked} isSaved={isSaved}/>
        
    </div>
    
  )
}

export default Post