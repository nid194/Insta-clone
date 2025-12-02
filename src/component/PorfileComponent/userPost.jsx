import React,{useState,useEffect} from 'react'
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai'
import { RiVideoLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { useDispatch,useSelector } from 'react-redux';
import { getUserPostAction,getSearchedUserPostAction } from '../Redux/Post/PostAction';
import { getReelsofUserAction } from '../Redux/Reel/ReelAction';
import UserCard from './userCard';

const UserPost = ({user}) => {

  const[activeTab, setActiveTab] = useState("Post")
  const dispatch = useDispatch()
  const { getAllPosts, searchedUserPosts } = useSelector((store) => store.post);
  const reels = useSelector((store)=>store.reel?.reelById)
  const token = localStorage.getItem("authToken")
  const loggedInUserId = useSelector((store) => store.user.findUserProfile?.userId);
  const savedPosts = user?.savedPost
  const savedReels = user?.savedReel
  console.log("saved reel:",savedReels)

  const tabs=[
    {
      tab:"Post",
      icon:<AiOutlineTable/>,
    },
    {
      tab:"Reels",
      icon:<RiVideoLine/>,
    },
    {
      tab:"Saved",
      icon:<BiBookmark />,
    },
    {
      tab:"Tagged",
      icon:<AiOutlineUser/>,
    }

  ]

  useEffect(() => {
    if (!user?.userId || !token) return;
    if (user.userId === loggedInUserId) {
      // Logged-in user’s posts
      dispatch(getUserPostAction({ token, userId: user.userId }));
    } else {
      // Searched user’s posts
      dispatch(getSearchedUserPostAction({ token, userId: user.userId }));
    }
  }, [token,user?.userId, dispatch,loggedInUserId]);

  const posts = user.userId === loggedInUserId ? getAllPosts : searchedUserPosts;

  useEffect(()=>{
    if(!token) return;
      dispatch(getReelsofUserAction({token}))
  },[token,dispatch])

  const renderTabContent = () => {
    if (activeTab === 'Post') {
      return (
        <div className='flex flex-wrap gap-2 mt-4'>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <UserCard key={post.postId} post={post}/>
            ))
          ) : (
            <p className='text-gray-500 mt-4'>No posts yet.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'Reels') {
      return (
        <div className='flex flex-wrap gap-4 mt-4'>
          {Array.isArray(reels) && reels.length > 0 ? (
            reels.map((reel) => (
                <video
                  key={reel.reelId}
                  src={reel.videoUrl}
                  controls
                  className='w-60 h-60 object-cover'
                />
              ))
          ) : (
            <p className='text-gray-500 mt-4'>No reels yet.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'Saved') {
    return (
     <div className='flex flex-wrap gap-4 mt-4'>
      {/* Saved Posts */}
       {savedPosts?.length > 0 &&
        savedPosts.map((post) => (
          <img
            key={post.postId}
            src={post.imgUrl}
            alt={post.caption || "Saved post"}
            className='w-60 h-60 object-cover'
          />
        ))
      }

      {/* Saved Reels */}
      {savedReels?.length > 0 &&
        savedReels.map((reel) => (
          <video
            key={reel.reelId}
            src={reel.videoUrl}
            controls
            className='w-60 h-60 object-cover'
          />
        ))
      }

      {/* Fallback message if nothing */}
      {(!savedPosts?.length && !savedReels?.length) && (
        <p className='text-gray-500 mt-4'>No saved posts or reels yet.</p>
       )}
      </div>
      );
    }

    if (activeTab === 'Tagged') {
      return (
        <div className='flex flex-wrap gap-4 mt-4'>
          {posts.length > 0 ? (
            posts
              .filter((p) => p.type === 'tagged') // optional if your post has type field
              .map((reel) => (
                <video
                  key={reel.reelId}
                  src={reel.videoUrl}
                  controls
                  className='w-60 h-60 rounded-lg object-cover'
                />
              ))
          ) : (
            <p className='text-gray-500 mt-4'>no tagged post yet.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div>
        <div className='flex space-x-14 border-t relative items-centre'>
        {
          tabs.map((item)=><div onClick={()=>setActiveTab(item.tab)} className={`${activeTab=== item.tab?"border-t-2 border-black dark:border-white":"opacity-60"}flex items-center cursor-pointer py-2 text-sm`}>
           <span className="flex items-center">
            <span>{item.icon}</span>
            <span className="ml-1">{item.tab}</span>
           </span>
         </div> )
        }
      </div>
      <div>{renderTabContent()}</div>
    </div> 
  )
}

export default UserPost