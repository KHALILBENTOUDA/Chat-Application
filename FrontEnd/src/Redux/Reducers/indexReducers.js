import {combineReducers} from 'redux'
import authReducer from './AuthReduces'
import ChatReducer from './ChatReducer'
import UsersProfile from './UsersProfile'
import AllUsersReducer from './AllUsersReducer'
import NotificationReducer from './NotificationReducer'
import MessageNotifications from './MessageNotifications'
import EmageReducer from './EmageReducer'
export const reducres=combineReducers({authReducer,ChatReducer,UsersProfile,AllUsersReducer,NotificationReducer,MessageNotifications,EmageReducer})
