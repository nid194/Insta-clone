import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST,GET_SEARCHED_USER_POST, POST_OF_ALL_USER } from "./PostActionType"


const initialValue={
      createPost:null,
      getAllPosts:null,
      deletepost:null,
      postsOfUser:[],
      likedPost:null,
      unlikedPost:null,
      savedPost:[],
      unsavedPost:null,
      singlePost:null,
      searchedUserPosts: [],
      postOfAllUser:[]
}

export const PostReducer=(store=initialValue,{type,payload})=>{

    if(type === CREATE_NEW_POST){
        return{...store, createPost:payload}
    }
    else if(type === GET_USER_POST){
        return {...store, getAllPosts:payload}
    }
    else if(type === DELETE_POST){
        return {...store, deletepost:payload}
    }
    else if(type === REQ_USER_POST){
        return{...store, postsOfUser:payload}
    }
    else if(type === LIKE_POST){
        return{...store, likedPost:payload}
    }
    else if(type === UNLIKE_POST){
        return{...store, unlikedPost:payload}
    }
    else if(type === SAVE_POST){
        return{...store, savedPost:payload}
    }
    else if(type === UNSAVE_POST){
        return{...store, unsavedPost:payload}
    }
    else if(type === GET_SINGLE_POST){
        return{...store, singlePost:payload}
    }
    else if(type === GET_SEARCHED_USER_POST){
        return{...store, searchedUserPosts:payload}
    }
    else if(type === POST_OF_ALL_USER){
        return{...store, postOfAllUser:payload}
    }
    return store;
    
}