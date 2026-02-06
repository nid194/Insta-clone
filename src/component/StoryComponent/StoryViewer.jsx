import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProgressBar from './progressBar'


const StoryViewerContainer = styled.div`
 display:flex;
 justify-content:center;
 align-items:center;
 height:100vh;
 background-color:black;
`
const StoryImage = styled.img`
 max-height:90vh;
 object-fit:contain;
`

const StoryViewer = ({stories}) => {

    // console.log("all story:",stories)
    const[currentStoryIndex, setCurrentStoryIndex] = useState(0)
    const[activeIndex,setActiveIndex] = useState(0)
    const[viewedStories, setViewedStories] = useState([])

  const orderedStories = [...stories].sort((a, b) => {
  const aViewed = viewedStories.includes(a.storyId);
  const bViewed = viewedStories.includes(b.storyId);

  // Unviewed first
  if (aViewed !== bViewed) return aViewed ? 1 : -1;

  // Unviewed → latest first
  if (!aViewed) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  // Viewed → oldest first
  return new Date(a.createdAt) - new Date(b.createdAt);
 });

  useEffect(() => {
  const currentStoryId = orderedStories?.[currentStoryIndex]?.storyId;
  if (currentStoryId && !viewedStories.includes(currentStoryId)) {
    setViewedStories((prev) => [...prev, currentStoryId]);
  }
 }, [currentStoryIndex, orderedStories, viewedStories]);

    useEffect(() =>{
       const interval = setInterval(() => {setCurrentStoryIndex((prev) => prev < orderedStories.length - 1 ? prev + 1 : 0)
        setActiveIndex((prev) => prev < orderedStories.length - 1 ? prev + 1 : 0)
       },2500)
       return () =>{
        clearInterval(interval)
       }
    },[orderedStories.length])

  return (
    <div className='relative w-full'>
        <div>
            <StoryViewerContainer>
                <StoryImage src={orderedStories?.[currentStoryIndex]?.img} alt="storyInside"/>
                <div className='absolute top-0 flex w-full'>
                    {
                      orderedStories.map((item,index) => ( 
                      <ProgressBar key ={item.storyId} duration={2000} index={index} activeIndex={activeIndex}/>
                     ))
                    }
                </div>
            </StoryViewerContainer>
        </div>
    </div>
  )
}

export default StoryViewer