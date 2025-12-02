import React from 'react'

const suggestionCard = () => {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <img className='w-9 h-9 rounded-full' src='https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D' alt='suggested'/>
           <div className='ml-2 text-left'>
              <p className='text-sm font-semibold'>username</p>
              <p className='text-sm font-semibold opacity-70'>Followers</p>
           </div>
        </div>
        <p className='text-blue-700 text-sm font-semibold'>Follow</p>
    </div>
  )
}

export default suggestionCard