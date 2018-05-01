import { editProfileService, getUserProfileService } from '../services/Profile';
import {SAVE_USER} from "../reducers/userProfile";
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