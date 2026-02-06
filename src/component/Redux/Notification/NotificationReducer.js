import { FETCH_NOTIFICATIONS_SUCCESS,FETCH_NOTIFICATIONS_FAILURE, GET_LIKED_COMMENTED_POST} from "./NotificationActionType";

const initialState = {
  notifications: [],
  error: null,
  likesAndCommentsOfPost:[]
};

export const notificationReducer = (store = initialState,{type,payload}) => {
  if (type === FETCH_NOTIFICATIONS_SUCCESS) {
      return {
        ...store,
        notifications: payload,
        error: null,
      };
    }
    else if(type === FETCH_NOTIFICATIONS_FAILURE){
      return {
        ...store,
        error: payload,
      };
    }
    else if(type === GET_LIKED_COMMENTED_POST){
      return {...store, likesAndCommentsOfPost : payload}
    }
      return store;
};
