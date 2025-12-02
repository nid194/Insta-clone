import React,{useEffect} from 'react'
import ExploreCard from '../../component/ExploreComponent/ExploreCard'
import { useSelector,useDispatch } from 'react-redux'
import { findPostOfAllUser } from '../../component/Redux/Post/PostAction'
import { getReelsAction } from '../../component/Redux/Reel/ReelAction'
import ExploreReelCard from '../../component/ExploreComponent/ExploreReelCard'

const Explore = () => {
 
  const allPost = useSelector((store)=>store.post.postOfAllUser) || []
  console.log("post of all user:",allPost)
  const explorerReels = useSelector((store)=>store.reel.explorerReel) || []
  console.log("reels of all user:",explorerReels)
  const dispatch = useDispatch()
  const token = localStorage.getItem("authToken")

  useEffect (()=>{
    if(!token) return
    dispatch(findPostOfAllUser({token}))
  },[token, dispatch])

  useEffect(()=>{
     if(!token) return
    dispatch(getReelsAction({token}))
  },[token, dispatch])

  return (
    <div>
     <div className="px-[10%] py-[10%]">
      {allPost && allPost.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 gap-1">
        {allPost.map((post) => (
          <ExploreCard key={post.postId} post={post} />
        ))}
      </div>
    ) : (
      <p>No posts to explore yet.</p>
    )}
    {explorerReels && explorerReels.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 gap-1">
        {explorerReels.map((reel) => (
          <ExploreReelCard key={reel.reelId} reel={reel} />
        ))}
      </div>
    ) : (
      <p>No posts to explore yet.</p>
    )}
  </div>
</div>
  )
}

export default Explore