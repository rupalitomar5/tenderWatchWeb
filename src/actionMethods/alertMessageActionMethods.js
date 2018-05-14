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

export const enableLoading= () => {
    return dispatch => dispatch({type: 'ENABLELOADING'});
};

export const disableLoading= () => {
    return (dispatch) => dispatch({type: 'DISABLELOADING'});
};