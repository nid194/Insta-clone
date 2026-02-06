import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { AuthReducer } from "../Auth/Reducer";
import { UserReducer } from "../User/UserReducer"
import { thunk } from "redux-thunk"
import { PostReducer } from "../Post/PostReducer";
import { CommentReducer } from "../Comment/CommentReducer";
import { StoryReducer } from "../Story/StoryReducer"
import { ReelReducer } from "../Reel/ReelReducer";
import { notificationReducer } from "../Notification/NotificationReducer";

const rootReducer=combineReducers({
  auth:AuthReducer,
  user:UserReducer,
  post:PostReducer,
  comment:CommentReducer,
  story:StoryReducer,
  reel: ReelReducer,
  notification: notificationReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));