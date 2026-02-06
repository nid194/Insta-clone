import React,{useState } from 'react'
import StoryViewer from '../StoryComponent/StoryViewer'

const Userstory = ({story}) => {
  // console.log("stories:",story)

 const [showStories, setShowStories] = useState(false);
  const handleStoryClick = () => {
    setShowStories(true);
  };

  // const storiesArray = story?.story ? story.story : [story]

  // const stories =  storiesArray?.[0]?.img  || // if story.story is array
  //   story?.img ||             // if item is a single story
  //   "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  return (
   <div>
      <div
        onClick={handleStoryClick}
        className="cursor-pointer flex flex-col items-center">
        <div className="w-18 h-18 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
        <img
          className="w-16 h-16 rounded-full"
          src={
             story[0]?.user?.profileImg||"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
          alt="story"/>
        </div>
        <p className="text-[70%]">{story[0]?.user?.username}</p>
      </div>

      {/* Show StoryViewer modal */}
      {showStories && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
          <StoryViewer stories={story} />
          <button
            className="absolute top-4 right-4 text-white text-xl"
            onClick={() => setShowStories(false)}>
            ✕
          </button>
        </div>
      )}
    </div> 
  )
}

export default Userstory