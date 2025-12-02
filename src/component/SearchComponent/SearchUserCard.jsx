import React from 'react'

const SearchUserCard = ({user}) => {
  return (
    <div className='py-2 cursor-pointer'>
        <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full' src={user.profileImg ||"https://cdn.pixabay.com/photo/2025/05/11/11/44/tulips-9592711_1280.jpg"} alt=""/>
            <div className='ml-5'>
             <p>{user.name}</p>
             <p className='opacity-70'>{user.username}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchUserCard