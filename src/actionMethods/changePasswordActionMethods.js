import { changePasswordService } from '../services/changePasswordService';
import {SHOW_MODAL} from "../reducers/alertModal";

export const changePassword = (credentials, user) => {
  return dispatch => {
     return changePasswordService(credentials, user).then( response => {
          dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: response.data.message}});
      }).catch( error => {
          dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
      });
  }
};