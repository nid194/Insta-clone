import { ADD_NEW_REEL, GET_ALL_REELS, GET_USER_REEL, GET_USERS_REELS,LIKED_REELS,UNLIKED_REELS,SAVED_REELS,UNSAVED_REELS } from "./ReelActionType";

const initialValue={
      addNewReel:null,
      getReelsOfUsers:[],
      getLikedReel:null,
      unlikedReel:null,
      savedReel:null,
      unsavedReel:null,
      explorerReel:[],
      reelById:[]

}

export const ReelReducer=(store=initialValue,{type,payload})=>{

    if(type === ADD_NEW_REEL){
        return{...store, addNewReel:payload}
    }else if(type === GET_USERS_REELS){
        return{...store, getReelsOfUsers:payload || []}
    }else if(type === LIKED_REELS){
        return{...store, getLikedReel:payload || []}
    }else if(type === UNLIKED_REELS){
        return{...store, unlikedReel:payload || []}
    }else if(type === SAVED_REELS){
        return{...store, savedReel:payload || []}
    }else if(type === UNSAVED_REELS){
        return{...store, unsavedReel:payload || []}
    }else if(type === GET_ALL_REELS){
        return{...store, explorerReel:payload || []}
    }else if(type === GET_USER_REEL){
        return{...store, reelById:payload || []}
    }
     return store;
    
}