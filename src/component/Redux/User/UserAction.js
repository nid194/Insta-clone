import {FOLLOW_USER, GET_USER_BY_USERNAME, GET_USERS_BY_USER_IDS, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER, GET_USER_PROFILE, GET_SELECTED_USER_PROFILE} from "./UserActionType";

export const findUserByUsernameAction = (data) => async(dispatch)=>{
 try{
     const response = await fetch(`http://localhost:8080/findByUsername?username=${encodeURIComponent(data.username)}`,{

        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
      })
      const user = await response.json();

     console.log("find by username:", user);
     dispatch({ type: GET_USER_BY_USERNAME, payload: user.singleuserResponse});
   }catch(error){
     console.error("username not found:", error);
     dispatch({ type: "USERNAME_FAILURE", payload: error.message });
   }
}

export const findUsersByUserIdsAction = (data) => async(dispatch)=>{
 try{  
     const response = await fetch("http://localhost:8080/findAllUser",{

        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
     })
     const user = await response.json();

     console.log("find all user:", user);
     dispatch({ type: GET_USERS_BY_USER_IDS, payload: user.response.singleuserResponse.userResponse});
    }catch(error){
      console.error("user not found:", error);
      dispatch({ type: "SIGNUP_FAILURE", payload: error.message });
   }
}

export const followUserAction = (data) => async(dispatch)=>{
   console.log("data:",data)
  try{   
     const response = await fetch(`http://localhost:8080/followUser?followUserId=${encodeURIComponent(data.followUserId)}`,{

        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
     })
   //   console.log("response:",response)
     const user = await response.json();

     console.log("following user:", user);
     dispatch({ type: FOLLOW_USER, payload: user.userResponse});
    }catch(error){
      console.error("couldn't follow user:", error);
      dispatch({ type: "FOLLOW_USER_FAILURE", payload: error.message });
   }
}

export const unFollowUserAction = (data) => async(dispatch)=>{
  try{   
     const response = await fetch(`http://localhost:8080/unfollowUser?unfollowUserId=${encodeURIComponent(data.unfollowUserId)}`,{

        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
       })
     const user = await response.json();

     console.log("unfollowed user:", user);
     dispatch({ type: UNFOLLOW_USER, payload: user.userResponse});
    }catch(error){
      console.error("couldn't follow user:", error);
      dispatch({ type: "UNFOLLOW_USER_FAILURE", payload: error.message });
   }
}

export const searchUserAction = (data) => async(dispatch)=>{
  try{  
     const response = await fetch(`http://localhost:8080/searchUser?q=${encodeURIComponent(data.query)}`,{

        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
     })
     const user = await response.json();

     console.log("user:", user);
     dispatch({ type: SEARCH_USER, payload: user.usersResponse});
    }catch(error){
      console.error("user not found:", error);
      dispatch({ type: "SEARCH_USER_FAILURE", payload: error.message });
   }
}

export const findUserProfileAction = (data) => async(dispatch)=>{
   // console.log('findUserProfileAction is called')
  try{   
     const response = await fetch("http://localhost:8080/profile",{

        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
     })

     const user = await response.json();
   //   user = user ? JSON.parse(user) : null;
     console.log("user:", user);
     dispatch({ type: GET_USER_PROFILE, payload:user.userResponse });
   }catch(error){
        console.error("user details not found:", error);
        dispatch({ type: "GET_USER_FAILURE", payload: error.message });
   }
}

export const updateUserAction = (data) => async(dispatch)=>{
  try{   
     const response = await fetch("http://localhost:8080/account/editProfile",{

        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
            body: JSON.stringify(data.data)
     })
     const user = await response.json();

     console.log("updated detail of user:", user);
     dispatch({ type: UPDATE_USER, payload: user.singleuserResponse});
   }catch(error){
        console.error("couldn't update details:", error);
        dispatch({ type: "UPDATE_USER_FAILURE", payload: error.message });
   }
}

export const getUserProfileByIdAction = ({ token, userId }) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/findUserById?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    console.log("Fetched searched user:", data);

    // store the searched user profile
    dispatch({
      type: GET_SELECTED_USER_PROFILE,
      payload: data.singleuserResponse || null,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    dispatch({ type: "GET_USER_FAILURE", payload: error.message });
  }
};
