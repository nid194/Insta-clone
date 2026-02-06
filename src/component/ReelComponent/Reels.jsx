import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react';
import { BsBookmark, BsBookmarkFill, BsEmojiSmile } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import { isReelLikedByUser,isSavedReel } from '../../config/Logic';
import { likedReelsAction,unlikedReelsAction,savedReelsAction,unsavedReelsAction } from '../Redux/Reel/ReelAction';
import ReelCommentModal from '../Comment/ReelCommentModal'

const Reels = ({reel}) => {
  const {findUserProfile} = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleSavedReel = () =>{
    setIsReelSaved(true)
    dispatch(savedReelsAction(data))
     console.log(" ----------------saved---------------",data)
  }

  const handleUnsavedReel = () =>{
    setIsReelSaved(false)
    dispatch(unsavedReelsAction(data))
    console.log("----------unsaved --------------",data)
  }

  const handleOpenComment = () =>{
    // navigate(`/comment/${data.reelId}`);
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
                            <img className='h-12 w-12 rounded-full' src={reel.user?.userImage || 'https://cdn.pixabay.com/photo/2023/09/22/07/02/red-8268266_1280.jpg'} alt=''/>
                            <div className='pl-2'>
                              <p className='font-semibold text-sm'>{reel.user?.username}</p>
                              <p className='font-thin text-sm text-left'>{reel.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 px-5">

  {/* VIDEO */}
  <div className="w-[60%]">
    <div className="relative w-full aspect-[9/16] bg-black rounded-md overflow-hidden">
      <video
        src={reel?.videoUrl}
        className="absolute inset-0 w-full h-full object-contain"
        controls
      />
    </div>
  </div>

  {/* SIDE ACTION BAR */}
  <div className="flex flex-col items-center justify-end space-y-6 pb-8">
    
    {/* LIKE */}
    <div className="flex flex-col items-center">
      {isReelLiked ? (
        <AiFillHeart
          className="text-2xl text-red-500 cursor-pointer"
          onClick={handleReelUnlike}
        />
      ) : (
        <AiOutlineHeart
          className="text-2xl cursor-pointer"
          onClick={handleReelLike}
        />
      )}
      <span className="text-sm">
        {reel?.userLikedReel?.length || 0}
      </span>
    </div>

    {/* COMMENT */}
    <div className="flex flex-col items-center cursor-pointer">
      <FaRegComment
        className="text-2xl"
        onClick={handleOpenComment}
      />
      <span className="text-sm">
        {reel?.comments?.length || 0}
      </span>
    </div>

    {/* SHARE */}
    <RiSendPlaneLine className="text-2xl cursor-pointer" />

    {/* SAVE */}
    {isReelSaved ? (
      <BsBookmarkFill
        className="text-2xl cursor-pointer"
        onClick={handleUnsavedReel}
      />
    ) : (
      <BsBookmark
        className="text-2xl cursor-pointer"
        onClick={handleSavedReel}
      />
    )}
  </div>
</div>
   </div>
        <ReelCommentModal handleReelLike={handleReelLike} onClose={onClose} reel={reel} isOpen={isOpen} handleSavedReel={handleSavedReel} isReelLiked={isReelLiked} isReelSaved={isReelSaved}/>
   </div>
  )
}

export default Reels