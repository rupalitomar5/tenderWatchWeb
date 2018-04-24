import {HIDE_MODAL} from '../reducers/alertModal';

export const hideAlertModal = () => {
  return dispatch => {
      dispatch({type:HIDE_MODAL});
  }
};