import { GET_USER_BY_USERNAME, FOLLOW_USER, GET_USERS_BY_USER_IDS, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER, GET_USER_PROFILE,GET_SELECTED_USER_PROFILE } from "./UserActionType"


const initialValue = {
    findByUsername:null,
    findUserByIds:[],
    findUserProfile:null,
    followUser:null,
    unfollowUser:null,
    searchUser:[],
    updateUser:null,
    selectedUserProfile:null
}

export const UserReducer=(store=initialValue,{type,payload})=>{

    if(type === GET_USER_BY_USERNAME){
        return{...store, findByUsername:payload}
    }
    else if(type === GET_USER_PROFILE){
        return {...store, findUserProfile:payload}
    }
    else if(type === GET_USERS_BY_USER_IDS){
        return {...store, findUserByIds:payload}
    }
    else if(type === FOLLOW_USER){
        return {...store, followUser:payload}
    }
    else if(type === UNFOLLOW_USER){
        return{...store, unfollowUser:payload}
    }
    else if(type === SEARCH_USER){
        return{...store, searchUser:payload}
    }
    else if(type === UPDATE_USER){
        return{...store, updateUser:payload,findUserProfile: payload}
    }
    else if(type === GET_SELECTED_USER_PROFILE){
        return{...store, selectedUserProfile:payload}
    }
    return store;
}