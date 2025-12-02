import { ADD_STORY, FIND_ALL_STORY_OF_USER } from "./StoryActionType";

export const addStoryAction =(data) => async(dispatch)=>{
  try{
      const response = await fetch("http://localhost:8080/api/stories/addStory",{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer" + data.token
            },
        body:JSON.stringify(data.story)
    })
     const newStory = await response.json();
    
         console.log("user story:", newStory);
         dispatch({ type: ADD_STORY, payload: newStory.singleStory});
 }catch(error){
       console.log("story cannot be uploaded:", error.message);
         dispatch({ type:"", payload: error.message});
 }
}

export const findStoryAction =(data) => async(dispatch)=>{
  try{

      const response = await fetch("http://localhost:8080/api/stories/findAllStoryOfUser",{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer" + data.token
            },
    })
     const foundedStory = await response.json();
    
         console.log("found user story:", foundedStory);
         dispatch({ type: FIND_ALL_STORY_OF_USER, payload: foundedStory.stories});
 }catch(error){
       console.log("story cannot be found:", error.message);
         dispatch({ type:"", payload: error.message});
 }
}

