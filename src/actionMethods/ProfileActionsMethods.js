import { editProfileService, getUserProfileService,getNotificationService,deleteNotificationService,readNotificationService } from '../services/Profile';
import {SAVE_USER, GET_NOTIFICATION, READ_NOTIFICATION, REMOVE_NOTIFICATION} from "../reducers/userProfile";
import {SHOW_MODAL} from "../reducers/alertModal";

export const editProfile = (user)=> {
  return dispatch => {
      let profileForm = new FormData();
      for (let key in user) {
          profileForm.append(key, user[key]);
      }
      return editProfileService(profileForm, user._id).then( response => {
          dispatch({type:SAVE_USER,payload:response.data});
          dispatch({type: SHOW_MODAL, payload: {header: 'Profile', message: 'Your changes are successfully saved!!'}});
          return true;
      }).catch( e => {
          dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: e.response.data.error}});
          return false;

      });
  }
};

export const getUserProfile = () => {
    return dispatch => {
        getUserProfileService().then( response => {
            dispatch({type:SAVE_USER,payload:response.data});
        }).catch( error => {
            console.log(error);
            debugger;
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
        });
    }
};

export const getNotification = () => {
    debugger;
  return dispatch => {
      getNotificationService().then((res)=>{
          dispatch({type:GET_NOTIFICATION,payload:res.data});
      }).catch((err)=>{
          dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
      })
  }
};

export const readNotificationMethod = (notification) => {
    return dispatch => {
        debugger;
        readNotificationService(notification).then((res)=>{
            dispatch({type:READ_NOTIFICATION,payload:notification});
        }).catch((err)=>{console.log('error in read notification:',err)});
    }
};

export const removeNotificationMethod = (notification) => {
    return dispatch => {
        deleteNotificationService(notification).then((res)=>{
            dispatch({type:REMOVE_NOTIFICATION,payload:notification});
        }).catch((err)=>{
            dispatch({type: SHOW_MODAL, payload: {header: 'Error in removing notification', message: err.response.data.error}});
        })
    }
};