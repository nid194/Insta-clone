import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Userstory = () => {

  const {story} = useSelector((store)=>store)
  console.log("story:",story)

  const navigate = useNavigate()

  const handleStory = () =>{
    navigate("/story")
  }

  return (
    <div onClick= {handleStory} className='cursor-pointer flex flex-col items-center'>
        <img className='w-16 h-16 rounded-full' src={story?.findStoryAction?.username} alt='story'/>
        <p className='text-[70%]'>{story?.user?.username}</p>
    </div>
  )
}

export default Userstory