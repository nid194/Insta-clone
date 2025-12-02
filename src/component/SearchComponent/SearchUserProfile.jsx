import React,{useEffect} from 'react'
import UserDetail from '../PorfileComponent/userDetail'
import UserPost from '../PorfileComponent/userPost'
import { useDispatch, useSelector } from "react-redux";
import { getSearchedUserPostAction } from '../Redux/Post/PostAction';


const SearchUserProfile = ({user}) => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const { searchedUserPosts } = useSelector((store) => store.post);

  useEffect(() => {
    if (token && user?.userId) {
      dispatch(getSearchedUserPostAction({ token, userId: user.userId }));
    }
  }, [token, user?.userId, dispatch]);

  return (
    <div className='pl-10'>
      <UserDetail user= {user}/>
      <UserPost user = {searchedUserPosts} />
    </div>
  )
}

export default SearchUserProfile