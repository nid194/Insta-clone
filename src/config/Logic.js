export const isPostLikedByUser =(post,userId)=>{

    const likedPosts = post?.likedByUser
    console.log("liked post:",likedPosts)

   if (!likedPosts || !Array.isArray(likedPosts)) {
    console.log("something went wrong")
    return false;
  }

  // iterate over users
  for (let item of likedPosts) {
    if (item.userId === userId) {
        console.log("item",item.userId)
      return true;
    }
  }
  return false;
}

export const isReelLikedByUser =(reel,userId)=>{

    const likedReels = reel?.userLikedReel
    console.log("liked reel:",likedReels)

   if (!likedReels || !Array.isArray(likedReels)) {
    console.log("something went wrong")
    return false;
  }

  // iterate over users
  for (let item of likedReels) {
    if (item.userId === userId) {
        console.log("item",item.userId)
      return true;
    }
  }
  return false;
}

export const isCommentLikedByUser=(comment, userId)=>{

    if (!comment?.likedComments || !Array.isArray(comment.likedComments)) {
    return false;
  }

   
    for(let item of comment.likedComments){
        if(item.userId===userId) 
            console.log("user id:",item.userId)
            return true;
    }
    return false;
}

export const isSavedPost =(user, postId)=>{

    const savedPosts = user?.savedPost;
    // console.log("user:", user);
    // console.log("userResponse:", user?.userResponse);
    // console.log("saved post:",savedPosts)

    if (!savedPosts || !Array.isArray(savedPosts)) {
        // console.log("no saved post found")
    return false;
  }

    for(let item of savedPosts){
        if(item.postId===postId){
            // console.log("post matched",postId)
            return true;
        }
    }
   return false;
}

export const isSavedReel =(user, reelId)=>{

    const savedReel = user?.savedReel;

    if (!savedReel || !Array.isArray(savedReel)) {
        console.log("no saved reel found")
    return false;
  }

    for(let item of savedReel){
        if(item.reelId===reelId){
            console.log("reel matched",reelId)
            return true;
        }
    }
   return false;
}

export const isFollowing = (findUserProfile,user2)=>{

    if (!findUserProfile || !user2) return false;
  if (!Array.isArray(user2.follower)) return false;
  
    if(findUserProfile && user2){
        for(let item of user2.follower){
            if(findUserProfile.userId===item.userId) return true;
        }
    }
    return false;
}

export const timeDifference = (timestamp)=>{

    const date = new Date(timestamp)
    const diff = Date.now()-date.getTime();
    const seconds = Math.floor(diff/1000);
    const mins = Math.floor(seconds/60);
    const hours = Math.floor(mins/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);

    if(weeks>0){ 
        return weeks +" "+ "week" +(weeks===1?"":"s")+" "+ "ago";
    }else if(days>0){
        return days +" "+ "day" +(days===1?"":"s")+" "+ "ago";
    }else if(hours>0){
        return hours +" "+ "hour" +(hours===1?"":"s")+" "+ "ago";
    }else if(mins>0){
        return mins +" "+"min" +(mins===1?" ":"s")+" "+ "ago";
    }else if(seconds>0){
        return seconds +" "+ "sec"+(seconds===1?"":"s")+" "+ "ago";
    }
}

export const findUser =(user1, user2) =>{

    if (!user1 || !user2){ 
        console.log("user1:",user1)
        console.log("user2:",user2)
        return false;
    };
        return user1.userId === user2.userId;

}