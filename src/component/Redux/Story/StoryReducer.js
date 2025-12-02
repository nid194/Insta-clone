import { ADD_STORY, FIND_ALL_STORY_OF_USER } from "./StoryActionType";

const initialValue={
      addStory:null,
      getAllStory:[]
}

export const StoryReducer=(store=initialValue,{type,payload})=>{

    if(type === ADD_STORY){
        return{...store, addStory:payload}
    }
    else if(type === FIND_ALL_STORY_OF_USER){
        return {...store, getAllStory:payload}
    }
     return store;
}