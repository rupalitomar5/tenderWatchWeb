import { editProfileService, getUserProfileService,getNotificationService } from '../services/Profile';
import {SAVE_USER,GET_NOTIFICATION} from "../reducers/userProfile";
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
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
        });
    }
};

export const getNotification = () => {
  return dispatch => {
      getNotificationService().then((res)=>{
          dispatch({type:GET_NOTIFICATION,payload:res.data});
      }).catch((err)=>{
          dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
      })
  }
};