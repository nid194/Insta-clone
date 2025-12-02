import { ADD_COMMENT, GET_COMMENTS, GET_REEL_COMMENTS, LIKE_COMMENT, UNLIKE_COMMENT } from "./CommentActionType";

export const addCommentAction =(data) => async(dispatch)=>{
  // console.log("-----------------------------------------------------",data)
  try{
    const response = await fetch(`http://localhost:8080/api/comment/addComment?data=${data.data}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
        body:JSON.stringify({ text: data.content })
    })
     const addComment = await response.json();
    
         console.log("user comment:", addComment);
         dispatch({ type: ADD_COMMENT, payload:addComment});
 }catch(error){
       console.log("comment didn't get added:", error.message);
         dispatch({ type:"ADD_COMMENT_FALIURE", payload:error.message});
 }
}

export const getCommentAction =(data) => async(dispatch)=>{

  try{
    const response = await fetch(`http://localhost:8080/api/comment/postComments?postId=${encodeURIComponent(data.postId)}`,{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const findComment = await response.json();
    
         console.log("all comment:", findComment.commentsresponse);
        //  console.log("🔥 Dispatching GET_COMMENTS for postId:", data.postId);
        //  console.log("🧠 Full backend response:", findComment);
         dispatch({ type: GET_COMMENTS, payload:{
                    postId: data.postId,
                    comments: findComment.commentsresponse || [],
                   },
                  });
 }catch(error){
       console.log("no comment found:", error.message);
         dispatch({ type:"GET_COMMENTS_FALIURE", payload:error.message});
 }
}

export const getReelCommentAction =(data) => async(dispatch)=>{

  try{
    const response = await fetch(`http://localhost:8080/api/comment/postComments?postId=${encodeURIComponent(data.reelId)}`,{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const findReelComment = await response.json();
    
         console.log("all comment:", findReelComment.commentsresponse);
         dispatch({ type: GET_REEL_COMMENTS, payload:{
                    postId: data.reelId,
                    comments: findReelComment.commentsresponse || [],
                   },
                  });
 }catch(error){
       console.log("no comment found:", error.message);
         dispatch({ type:"GET_REEL_COMMENTS_FALIURE", payload:error.message});
 }
}

export const likeCommentAction =(data) => async(dispatch)=>{
  try{
    const response = await fetch(`http://localhost:8080/api/comment/likeComment?commentId=${encodeURIComponent(data.commentId)}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const likedComment = await response.json();
    
        console.log("liked comment:", likedComment);
        dispatch({ type: LIKE_COMMENT, payload:likedComment});
 }catch(error){
       console.log("post cannot be uploaded:", error.message);
       dispatch({ type:"LIKE_COMMENT_FALIURE", payload: error.message});
 }
}

export const unlikeCommentAction =(data) => async(dispatch)=>{
  try{
    const response = await fetch(`http://localhost:8080/api/comment/unlikeComment?commentId=${encodeURIComponent(data.commentId)}`,{
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+ data.token
            },
    })
     const unlikedComment = await response.json();
    
      console.log("unliked comment:", unlikedComment);
      dispatch({ type: UNLIKE_COMMENT, payload:unlikedComment});
 }catch(error){
       console.log("post cannot be uploaded:",error.message);
       dispatch({ type:"UNLIKE_COMMENT_FALIURE", payload: error.message});
 }
}