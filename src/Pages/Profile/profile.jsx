import React, { useEffect } from 'react'
import UserDetail from '../../component/PorfileComponent/userDetail'
import UserPost from '../../component/PorfileComponent/userPost'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findUserByUsernameAction, findUserProfileAction } from '../../component/Redux/User/UserAction'
import { isFollowing } from '../../config/Logic'


const Profile = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("authToken")
  const {username} = useParams()
  const {user} = useSelector((store)=>store)

  const profile = user.findUserProfile?.userResponse || user.findUserProfile;
  const otherUser = user.findByUsername?.userResponse || user.findByUsername;

  useEffect (()=>{
    if (!token || !username) return;

    // ✅ Always ensure logged-in user's data is available (load once)
    if (!profile) {
      dispatch(findUserProfileAction(token));
    }

    // ✅ Fetch searched user only if it's not the logged-in user
    if (profile && profile.username !== username) {
      const data = { token, username };
      dispatch(findUserByUsernameAction(data));
    }
  }, [token, username, dispatch, profile]);

  // ✅ Decide whose profile to show
   const isOwnProfile = profile?.username === username;
   const currentProfile = isOwnProfile ? profile : otherUser;

   if (!currentProfile) return <div>Loading...</div>;

   const isFollowed = !isOwnProfile && isFollowing(profile, currentProfile)


  return (
    <div className='px-20'>
        <div>
            <UserDetail user={currentProfile} isFollowing={isFollowed} />
        </div>
        <div>
            <UserPost  user={currentProfile}/>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Profile