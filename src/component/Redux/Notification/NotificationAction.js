import { FETCH_NOTIFICATIONS_SUCCESS, GET_LIKED_COMMENTED_POST } from "./NotificationActionType";

export const fetchNotificationsAction = (data) => async(dispatch)=>{
   console.log("------inside action----",data.token)
  try{   
     const response = await fetch("http://localhost:8080/api/notifications",{

        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
     })
     const user = await response.json();

     console.log("found user:", user);
     dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: user});
    }catch(error){
      console.error("couldn't find user:", error);
      dispatch({ type: "FETCH_NOTIFICATIONS_FAILURE", payload: error.message });
   }
}

export const likeAndCommentOnPostAction = (data) => async(dispatch)=>{
   console.log("------inside like and comment action------",data.token)
  try{   
     const response = await fetch("http://localhost:8080/api/likesAndCommentsOnPost",{

        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
     })
     const user = await response.json();

     console.log("likes and comments of post:", user);
     dispatch({ type: GET_LIKED_COMMENTED_POST, payload: user});
    }catch(error){
      console.error("couldn't find user:", error);
      
      dispatch({ type: "FETCH_LIKED_COMMENTED_NOTIFICATIONS_ON_POST", payload: error.message });
   }
}