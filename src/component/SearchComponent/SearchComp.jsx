import React,{useState} from 'react'
import './SearchComp.css'
import SearchUserCard from './SearchUserCard'
import { useDispatch,useSelector } from 'react-redux'
import { searchUserAction } from '../Redux/User/UserAction'
import SearchUserProfile from './SearchUserProfile'

const SearchComp = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("authToken")
  const  searchUsers  = useSelector((store)=>store.user.searchUser) || []
  console.log("search a user:",searchUsers)
  
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = (e) => {
    dispatch(searchUserAction({ token, query: e.target.value }));
  }; 

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };


  return (
    <div className="flex w-full h-screen">
      {/* Left panel */}
        <div className='w-1/5 border-r px-3 py-5 overflow-y-auto'>
            <h1 className='text-xl pb-5'>Search</h1>
            <input onChange={handleSearch} className='searchInput' type="text" placeholder='search...'/>
        <hr/>
          {searchUsers?.length > 0 ? (
              searchUsers.map((item) => <div key={item.userId} onClick={() => handleUserClick(item)}>
              <SearchUserCard user={item} />
            </div>)
          ) : (
              <p className="text-gray-500 mt-2">No users found</p>
          )}
        </div> 
        <div>
          {selectedUser ? (
           <SearchUserProfile user={selectedUser}/>
           ) : (
          <div className="text-gray-400 text-center mt-20">
            <p>Select a user to view their profile</p>
          </div>
        )}
        </div> 
    </div>
  )
}
export default SearchComp