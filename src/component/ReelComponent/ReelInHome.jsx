import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react';
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import { isReelLikedByUser,isSavedReel } from '../../config/Logic';
import { likedReelsAction,unlikedReelsAction,savedReelsAction,unsavedReelsAction } from '../Redux/Reel/ReelAction';
import ReelCommentModal from '../Comment/ReelCommentModal'

const ReelInHome = ({reel}) => {
  const {findUserProfile} = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[showDropDown, setShowDropDown] = useState(false);
  const[isReelLiked, setIsReelLiked] = useState(false)
  const[isReelSaved, setIsReelSaved] = useState(false)
  const{isOpen, onOpen, onClose} = useDisclosure()
  const token = localStorage.getItem("authToken")
  
    const data = {
    token,
    reelId: reel?.reelId
  }
  
  const handleReelLike = () =>{
    setIsReelLiked(true)
    dispatch(likedReelsAction(data))
    //  console.log("liked post action",data)
  }
  const handleReelUnlike = () =>{
    setIsReelLiked(false)
    dispatch(unlikedReelsAction(data))
  }
  const handleClick = () =>{
     setShowDropDown(!showDropDown)
  }
  const handleSavedReel = () =>{
    setIsReelSaved(true)
    dispatch(savedReelsAction(data))
  }

  const handleUnsavedReel = () =>{
    setIsReelSaved(false)
    dispatch(unsavedReelsAction(data))
    // console.log("------------------------",data)
  }

  const handleOpenComment = () =>{
    navigate(`/comment/${data.reelId}`);
    onOpen()
  }

  useEffect (()=>{
    if (!reel || !findUserProfile?.userId) {
       console.log("reel of user:",reel)
       return;
    }
       setIsReelLiked(isReelLikedByUser(reel,findUserProfile.userId)) 
       setIsReelSaved(isSavedReel(findUserProfile,reel.reelId))
  },[reel, findUserProfile]);
  return (
    <div>
        <div className='border rounded-md w-full'>
            <div className='flex justify-between items-center w-full py-4 px-5'>
                <div className='flex items-center'>
                   <img className='h-12 w-12 rounded-full' src={reel.user?.userImage ||'https://cdn.pixabay.com/photo/2023/09/22/07/02/red-8268266_1280.jpg'} alt=''/>
                   <div className='ml-2'>
                      <p className='font-semibold text-sm'>{reel?.user?.username}</p>
                      <p className='font-thin text-sm text-left'>{reel?.location}</p>
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
              <video src={reel?.videoUrl} controls className="w-full max-h-[550px] rounded-md"/>
            </div>
            <div className='flex justify-between items-center w-full px-5 py-4'>
              <div className='flex items-center space-x-2'>
                {
                    isReelLiked ? <AiFillHeart className='text-2xl hover:opacity-70 cursor-pointer text-red-500' onClick={handleReelUnlike}/> : <AiOutlineHeart className='text-xl hover:opacity-50 cursor-pointer' onClick={handleReelLike}/>
                }
                <FaRegComment onClick={handleOpenComment} className='text-xl hover:opacity-50 cursor-pointer'/>
                <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'/>
              </div>
              <div>
                { isReelSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnsavedReel}/>:<BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavedReel}/>}
              </div>
            </div>
            <div className='w-full py-2 px-5 text-left'>
              {reel?.userLikedReel?.length > 0 && <p>{reel?.userLikedReel?.length} likes</p>}
              {reel?.comment?.length > 0 && <p className='opacity-50 py-2 cursor-pointer'>view all {reel?.comment?.length}</p>}
            </div>
            <div className='border border-t w-full'>
              <div className='flex w-full items-center px-5'>
                <BsEmojiSmile/>
                <input className='commentInput' type="text" placeholder='add a comment..'/>
              </div>
            </div>
        </div>
        <ReelCommentModal handleReelLike={handleReelLike} reel={reel} onClose={onClose} isOpen={isOpen} handleReelSaved={handleSavedReel} isReelLiked={isReelLiked} isReelSaved={isReelSaved}/>
    </div>
  )
}

export default ReelInHome