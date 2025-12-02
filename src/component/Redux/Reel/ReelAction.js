import { ADD_NEW_REEL, GET_ALL_REELS, GET_USER_REEL, GET_USERS_REELS, LIKED_REELS, SAVED_REELS, UNLIKED_REELS, UNSAVED_REELS } from "./ReelActionType";

export const createNewReelAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/reel/addNewReel",{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
        body:JSON.stringify(data.reel)
    })
     const newReel = await response.json();
    
         console.log("user reel:", newReel);
         dispatch({ type: ADD_NEW_REEL, payload: newReel.singleReel});
 }catch(error){
       console.log("reel cannot be uploaded:", error.message);
         dispatch({ type:"NEW_REEL_FALIURE", payload: error.message});
 }
}

export const getFollowingUsersReelsAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/reel/getReelsofUsers?userIds=${encodeURIComponent(data.userIds)}`,{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })
     const reelsOfUsers = await response.json();
    
         console.log("users reels:", reelsOfUsers);
         dispatch({ type: GET_USERS_REELS, payload: reelsOfUsers.reels});
 }catch(error){
       console.log("reel cannot be uploaded:", error.message);
       dispatch({ type:"USERS_REELS_UPLOAD_FALIURE", payload: error.message});
 }
}

export const getReelsAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/reel/getAllReel",{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })
     const reelsOfUsers = await response.json();
    
         console.log("explorer reels:", reelsOfUsers);
         dispatch({ type: GET_ALL_REELS, payload: reelsOfUsers.reels});
 }catch(error){
       console.log("reel cannot be found in explorer:", error.message);
       dispatch({ type:"EXPLORER_REELS_FALIURE", payload: error.message});
 }
}
export const getReelsofUserAction =(data) => async(dispatch)=>{
        // console.log("in reel action--------------------")
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/reel/getAllReelofUser",{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })
     const reelsOfUsers = await response.json();
    
         console.log("user reel by id:", reelsOfUsers);
         dispatch({ type: GET_USER_REEL, payload: reelsOfUsers.reels});
 }catch(error){
       console.log("reel cannot be found  by id:", error.message);
       dispatch({ type:"USER_REELS_FALIURE", payload: error.message});
 }
}

export const likedReelsAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/reel/likeReel?reelId=${encodeURIComponent(data.reelId)}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })

     const likedReel = await response.json();
    
         console.log("user liked reels:", likedReel);
         dispatch({ type: LIKED_REELS, payload: likedReel.reels});
 }catch(error){
       console.log("reel cannot be liked:", error.message);
         dispatch({ type:"LIKED_REEL_FALIURE", payload: error.message});
 }
}

export const unlikedReelsAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/reel/unlikeReel?reelId=${encodeURIComponent(data.reelId)}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })
     const unlikedReel = await response.json();
    
         console.log("user unliked reels:", unlikedReel);
         dispatch({ type: UNLIKED_REELS, payload: unlikedReel.reels});
 }catch(error){
       console.log("reel cannot be unliked:", error.message);
         dispatch({ type:"UNLIKED_REEL_FALIURE", payload: error.message});
 }
}

export const savedReelsAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/reel/savedReel?reelId=${encodeURIComponent(data.reelId)}`,{
        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })
     const savedReel = await response.json();
    
         console.log("user saved reels:", savedReel);
         dispatch({ type:SAVED_REELS, payload: savedReel.userResponse});
 }catch(error){
       console.log("reel cannot be saved:", error.message);
         dispatch({ type:"SAVED_REEL_FALIURE", payload: error.message});
 }
}

export const unsavedReelsAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/reel/unsavedReel?reelId=${encodeURIComponent(data.reelId)}`,{
        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
    })
     const savedReel = await response.json();
    
         console.log("user unsaved reels:", savedReel);
         dispatch({ type:UNSAVED_REELS, payload: savedReel.userResponse });
 }catch(error){
       console.log("reel cannot be unsaved:", error.message);
         dispatch({ type:"UNSAVED_REEL_FALIURE", payload: error.message});
 }
}

