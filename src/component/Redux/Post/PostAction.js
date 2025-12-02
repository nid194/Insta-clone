import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST,GET_SEARCHED_USER_POST, POST_OF_ALL_USER } from "./PostActionType";


export const createPostAction =(data) => async(dispatch)=>{
  try{
     
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/posts/create",{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${authToken}`
            },
        body:JSON.stringify(data.postData)
    })
     const newPost = await response.json();
    
         console.log("user post:", newPost);
         dispatch({ type: CREATE_NEW_POST, payload: newPost.singlePostOfUser});
 }catch(error){
       console.log("post cannot be uploaded:", error.message);
         dispatch({ type:"CREATE_POST_FALIURE", payload: error.message});
 }
}

export const getUserPostAction =(data) => async(dispatch)=>{
        
  try{
    const response = await fetch(`http://localhost:8080/api/posts/allPostByUserId?userId=${encodeURIComponent(data.userId)}`,{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
       })
        const getPost = await response.json();
    
         console.log("all user post:", getPost);
         dispatch({ type: GET_USER_POST, payload: getPost.postResponse?.postsOfUser || [] });
 }catch(error){
         console.log("cannot find post:", error.message);
         dispatch({ type:"GET_POST_FALIURE",payload: error.message});
 }
}

export const getSearchedUserPostAction = (data) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/posts/allPostByUserId?userId=${encodeURIComponent(data.userId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      }
    );
    const getPost = await response.json();
    console.log("searched user post:", getPost);

    dispatch({
      type: GET_SEARCHED_USER_POST,
      payload: getPost.postResponse?.postsOfUser || [],
    });
  }catch(error){
        console.log("cannot find post:", error.message);
        dispatch({ type:"GET_POST_FALIURE",payload: error.message});
  }
}

export const deletePostAction =(data) => async(dispatch)=>{
  try{
    const response = await fetch(`http://localhost:8080/api/posts/delete?postId=${encodeURIComponent(data.postId)}`,{
        method:"DELETE",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const deletePost = await response.json();
    
         console.log("post deleted:", deletePost);
         dispatch({ type: DELETE_POST, payload: deletePost.singlePostOfUser});
 }catch(error){
         console.log("post cannot be deleted:", error.message);
         dispatch({ type:"DELETE_POST_FALIURE", payload:error.message});
 }
}

export const reqUserPostAction =(data) => async(dispatch)=>{
  try{
        if (!data.userIds || data.userIds.length === 0) {
      console.warn("No userIds provided, skipping request.");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/posts/following?userIds=${encodeURIComponent(data.userIds)}`,{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
        })
     const reqPost = await response.json();
    
         console.log("posts by user id:", reqPost);
         dispatch({ type:REQ_USER_POST, payload: reqPost.postsOfUser});
      }catch(error){
         console.log("no post by user:", error.message);
         dispatch({ type:"REQ_USER_POST_FAILURE", payload:error.message});
 }
}

export const likePostAction =(data) => async(dispatch)=>{
        console.log("--------------in method liked post-------------");
  try{
    const res = await fetch(`http://localhost:8080/api/posts/likePost?postId=${encodeURIComponent(data.postId)}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
        })
     const likedPost = await res.json();
    
         console.log("liked post by user:", likedPost);
         dispatch({ type:LIKE_POST, payload: likedPost.singlePostOfUser});
 }catch(error){
         console.log("post not liked:", error.message);
         dispatch({ type:"LIKE_POST_FALIURE", payload:error.message});
 }
}

export const unlikePostAction =(data) => async(dispatch)=>{
  try{
    const response = await fetch(`http://localhost:8080/api/posts/unlikePost?postId=${encodeURIComponent(data.postId)}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const unlikedPost = await response.json();
    
         console.log("unliked post by user:",unlikedPost);
         dispatch({ type:UNLIKE_POST, payload: unlikedPost.singlePostOfUser});
 }catch(error){
         console.log("cannot find post:", error.message);
         dispatch({ type:"UNLIKE_POST_FALIURE", payload:error.message});
 }
}

export const savePostAction =(data) => async(dispatch)=>{
  try{
    const response = await fetch(`http://localhost:8080/api/posts/savePost?postId=${encodeURIComponent(data.postId)}`,{
        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
       })

       const savedPost = await response.json();
    
         console.log("saved post:",savedPost);
         dispatch({ type:SAVE_POST, payload: savedPost.userResponse});
    }catch(error){
         console.log("post not saved:", error.message);
         dispatch({ type:"SAVE_POST_FALIURE", payload:error.message});
 }
}

export const unsavePostAction =(data) => async(dispatch)=>{
        console.log("--------------in unsave method------------------")
  try{
    const response = await fetch(`http://localhost:8080/api/posts/unsavePost?postId=${encodeURIComponent(data.postId)}`,{
        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const unsavedPost = await response.json();
    
         console.log("unsaved post:",unsavedPost);
         dispatch({ type:SAVE_POST, payload: unsavedPost.singlePostOfUser});
 }catch(error){
         console.log("post not saved:", error.message);
         dispatch({ type:"SAVE_POST_FALIURE", payload:error.message});
 }
}

export const getSinglePostAction=(data) => async(dispatch)=>{
  try{
    const response = await fetch("http://localhost:8080/api/posts/findById",{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const singlePost = await response.json();
    
         console.log("single post:",singlePost);
         dispatch({ type:GET_SINGLE_POST, payload: singlePost.singlePostOfUser});
 }catch(error){
         console.log("post not saved:", error.message);
         dispatch({ type:"SAVE_POST_FALIURE", payload:error.message});
 }
}

export const findPostOfAllUser=(data) => async(dispatch)=>{
  try{
    const response = await fetch("http://localhost:8080/api/posts/allUserPost",{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
       })

         const allPost = await response.json();
    
         console.log("all post of all user:",allPost.postsOfUser);
         dispatch({ type:POST_OF_ALL_USER, payload: allPost.postsOfUser});
        }catch(error){
         console.log("post not found:", error.message);
         dispatch({ type:"POST_FALIURE", payload:error.message});
 }
}