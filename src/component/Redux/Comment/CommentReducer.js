import { ADD_COMMENT, GET_COMMENTS, LIKE_COMMENT, UNLIKE_COMMENT,GET_REEL_COMMENTS } from "./CommentActionType"


const initialValue ={
      addComment:null,
      findComments:{},
      findReelComments:{},
      likedComment:null,
      UnlikedComment:null
}

export const CommentReducer=(store=initialValue,{type,payload})=>{

    if(type === ADD_COMMENT){
        return{...store, addComment:payload}  
    }
    else if(type === GET_COMMENTS){
        //  console.log("🧩 Reducer received type:", type, "payload:", payload);
        return {...store, findComments:{
      ...store.findComments,       // keep previous posts’ comments
      [payload.postId]: payload.comments,  // update current post’s comments
    },}
    }
    else if(type === GET_REEL_COMMENTS){
        return {...store, findReelComments:{
      ...store.findReelComments,       // keep previous posts’ comments
      [payload.postId]: payload.comments,  // update current post’s comments
    },}
    }
    else if(type === LIKE_COMMENT){
        return {...store, likedComment:payload }
    }
    else if(type === UNLIKE_COMMENT){
        return {...store, UnlikedComment:payload}
    }

    return store;
}