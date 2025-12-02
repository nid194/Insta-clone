import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { isCommentLikedByUser, timeDifference } from '../../config/Logic';
import { likeCommentAction, unlikeCommentAction } from '../Redux/Comment/CommentAction';
import { useDispatch, useSelector } from 'react-redux';

const CommentCard = ({ comment }) => {
    const[isCommentLiked, setIsCommentLiked] = useState(false);
    const  dispatch = useDispatch()
    const token = localStorage.getItem("authToken")
    const commentId = comment?.commentId
    console.log("commentId:",commentId)
    const {findUserProfile} = useSelector((store)=>store.user)

    const handleIsLiked = () =>{
       setIsCommentLiked(true)
       dispatch(likeCommentAction({ token, commentId }));
    }

    const handleIsUnliked = () =>{
       setIsCommentLiked(false)
       dispatch(unlikeCommentAction({token, commentId}))
    }

    useEffect (()=>{
      if (!comment || !findUserProfile?.userId) {
       console.log("comment of user:",comment)
       console.log("user id:",findUserProfile?.userId)
       return;
      }
       setIsCommentLiked(isCommentLikedByUser(comment,findUserProfile.userId))
    },[comment,findUserProfile])
  return (
    <div>
        <div className='flex justify-between items-center py-5'>
            <div className='flex items-center mt-2'>
                <div>
                    <img className='w-9 h-9 rounded-full' src={comment.user.profileImg || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt='commentcard'/>
                </div>
                <div className='ml-1.5'>
                  <p>
                    <span className='font-semibold'>{comment.user.username}</span>
                    <span className='ml-2'>{comment.text}</span>
                  </p>
                  <div className='flex items-center space-x-3 text-xs opacity-60 pt-2'>
                    <span>{timeDifference(comment.createdAt)}</span>
                    {comment?.likedComments.length>0 && <span>{comment?.likedComments.length} likes</span>}
                  </div>
                </div>
            </div>
            {
                isCommentLiked ? <AiFillHeart className='text-xs hover:opacity:80 cursor-pointer text-red-600' onClick={handleIsUnliked}/>:<AiOutlineHeart className='text-xs hover:opacity:80 cursor-pointer' onClick={handleIsLiked}/>
            }
        </div>
    </div>
  ) 
}

export default CommentCard