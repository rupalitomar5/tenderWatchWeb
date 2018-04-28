import { editProfileService } from '../services/Profile';
import {LOGIN} from "../reducers/auth";

export const editProfile = (user, image)=> {
  return dispatch => {
      let profileForm = new FormData();
      for (let key in user) {
          profileForm.append(key, user[key]);
      }
      editProfileService(profileForm, user._id).then( response => {
          dispatch({type:LOGIN,payload:response.data});
      }).catch( e => {
          console.log(e);
      });
  }
};