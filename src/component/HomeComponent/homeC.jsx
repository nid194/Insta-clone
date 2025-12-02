import React from 'react'
import SuggestionCard from '../../component/HomeComponent/suggestionCard'
import { useSelector } from 'react-redux'

const HomeC = () => {
  const {user} = useSelector((store)=>store)
  return (
    <div>
      <div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div>
              <img className='w-12 h-12 rounded-full' src={user.findUserProfile?.profileImg || 'https://cdn.pixabay.com/photo/2023/04/26/18/05/bird-7953069_1280.jpg'} alt='rightside'/>
            </div>
            <div className='text-left ml-3'>
              <p>{user.findUserProfile?.name}</p>
              <p className='opacity-70'>{user.findUserProfile?.username}</p>
            </div>
          </div>
          <div>
            <p className='text-blue-700 font-semibold'>switch</p>
          </div>
        </div>
        <div className='space-y-5 mt-10'>
            {[1,1,1,1].map((item) => <SuggestionCard/>)}
          </div>
      </div>
    </div>
  )
}

export default HomeC