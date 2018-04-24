import {HIDE_MODAL,SHOW_MODAL} from '../reducers/alertModal';

export const openAlertModal = (payload) => {
    return dispatch=>{
        dispatch({type:SHOW_MODAL,payload});
    }
};

export const hideAlertModal = () => {
  return dispatch => {
      dispatch({type:HIDE_MODAL});
  }
};