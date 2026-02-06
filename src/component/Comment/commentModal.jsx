import { Modal,ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { useEffect,useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import CommentCard from './commentCard';
import { AiFillHeart,AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BsBookmarkFill,BsBookmark } from 'react-icons/bs';
import { BsEmojiSmile } from 'react-icons/bs';
import './comment.css'
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, getCommentAction } from '../Redux/Comment/CommentAction';
import { timeDifference } from '../../config/Logic';



const CommentModal = ({ isOpen, onClose, isSaved, isPostLiked, handlePostLike, handleSaved,post }) => {

  const[commentContent, setCommentContent]=useState()
  const dispatch = useDispatch()
  const token = localStorage.getItem("authToken")
  const {addComment, findComments, likedComment} = useSelector((store) => store.comment)
  const user = useSelector((store) => store.user)
  const comments = findComments?.[post?.postId] || [];

  useEffect(()=>{
    if (!post)
    {
      console.log("postId:",post)
      return;
    }
    dispatch(getCommentAction({token,postId:post.postId}))
  },[dispatch, addComment, token, post, likedComment])

  return (
   <div>
     <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
       <ModalOverlay />
       <ModalContent>
         <ModalBody>
           <div className='flex h-[75vh]'>
              <div className='w-[45%] flex flex-col justify-center'>
                <img className='max-h-full w-full' src={post?.imgUrl} alt='comment'/>
              </div>
              <div className='w-[55%] pl-10 relative'>
                <div className='flex justify-between items-center py-5'>
                 <div className='flex items-center'>
               <div>
                 <img className='w-9 h-9 rounded-full' src={user.findUserProfile?.profileImg || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt='user'/>
               </div>
               <div className='ml-2'>
                 <p>{user.findUserProfile?.username}</p>
               </div>
                 </div>
                  <BsThreeDots/>
                </div>
                <hr/>
                <div className='comment'>
                  {comments  && comments.length > 0 ? (comments.map((comment)=> <CommentCard key={comment.commentId} comment={comment}/>)):(
                     <p>No comment available</p>
                  )}
                </div>
                <div className='absolute bottom-0 w-[90%]'>
                 <div className='flex justify-between items-center w-full py-4'>
                   <div className='flex items-center space-x-2'>
                      {isPostLiked ? (
                           <AiFillHeart className='text-2xl text-red-500' onClick={handlePostLike}/>
                          ) : (
                           <AiOutlineHeart className='text-xl' onClick={handlePostLike}/>
                          )
                        }
                        <FaRegComment className='text-xl hover:opacity-50 cursor-pointer'/>
                        <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'/>
                    </div>
                    <div>
                      {
                          isSaved ? (
                           <BsBookmarkFill className='text-xl' onClick={handleSaved}/>
                          ) : (
                           <BsBookmark className='text-xl' onClick={handleSaved}/>
                          )
                        }
                    </div>
                 </div>
                 <div className='w-full py-2'>
                    {
                      post?.likedByUser?.length>0 && (<p>{post?.likedByUser.length} likes</p>)
                    } 
                    <p className='opacity-50 text-sm'>{timeDifference(post?.createdAt)}</p>
                 </div>
                 <div className='flex items-center w-full'>
                     <BsEmojiSmile/>
                     <input className='commentInput' type="text" placeholder='add a comment..' onChange={(e)=>setCommentContent(e.target.value)} onKeyPress={(e)=>{
                       if(e.key === "Enter"){
                        const data = {
                          token:token,  
                          content:commentContent,
                          data : post.postId 
                        }
                        dispatch(addCommentAction(data))
                       }
                     }}/>
                 </div>
                </div>
              </div>
           </div>
         </ModalBody>
       </ModalContent>
     </Modal>
   </div>
  );
}


export default CommentModal