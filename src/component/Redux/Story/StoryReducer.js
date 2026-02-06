import { ADD_STORY, FIND_ALL_STORY_OF_USER, STORIES_OF_USERS } from "./StoryActionType";

const initialValue={
      addStory:null,
      getAllStory:[],
      getAllUserStories:[]
}

export const StoryReducer=(store=initialValue,{type,payload})=>{

    if(type === ADD_STORY){
        return{...store, addStory:payload}
    }
    else if(type === FIND_ALL_STORY_OF_USER){
        return {...store, getAllStory:payload}
    }
    else if(type === STORIES_OF_USERS){
        return {...store, getAllUserStories:payload}
    }
     return store;
}