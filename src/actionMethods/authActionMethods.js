import { history } from '../store';
import {LOGOUT,LOGIN} from '../reducers/auth';
import { SHOW_MODAL } from '../reducers/alertModal';
import {CHANGE_USER_ROLE,CLEAR_USER_ROLE} from '../reducers/userRole';
import { loginService, logoutService,registerService,forgotPasswordService } from '../services/authServices';

export const loginMethod = (credentials) => {
  return dispatch => {
      loginService(credentials).then( response => {
          localStorage.setItem('auth_user', response.data.token);
          dispatch({type:LOGIN,payload: response.data.token});
          history.push('/');
      }).catch( error => {
          console.log('error',error);
      });
  }
};

export const logoutMethod = () => {
    return dispatch => {
        logoutService().then( response => {
            if(response.data === 'OK'){
              localStorage.removeItem('auth_user');
                dispatch({type:LOGOUT});
            }else {
                throw Error(response.data.Message);
            }
        }).catch( error => {
            console.log('error',error);
            //alert(error);
        });
    }
};

export const registerMethod = (regDetails) => {
  return dispatch => {
      let regForm = new FormData();
      regForm.append("email",regDetails.email);
      regForm.append("password",regDetails.password);
      regForm.append('role',regDetails.role);
      regForm.append('image',regDetails.profilePhoto);
        registerService(regForm).then((response)=>{
            localStorage.setItem('auth_user',response.data.token);
            dispatch({type:LOGIN,payload:response.data.user});
        }).catch((err)=>{
            dispatch({type:SHOW_MODAL, payload:{ header: 'Error', message: err.response.data.error}});
        })
  }
};

export const forgotPasswordMethod = (payload) => {
  return dispatch => {
      forgotPasswordService(payload).then(()=>{
          dispatch({type:SHOW_MODAL,payload:{header:'Forgot Password',message:'sent mail to your account'}})
      }).catch((err)=>{
          dispatch({type:SHOW_MODAL,payload:{header:'Error',message:err.message}})
      });
  }
};

export const setUserRoleMethod = (role) => {
    return dispatch => {
        dispatch({type:CHANGE_USER_ROLE,payload:role})
    }
};

export const clearRoleMethod = () => {
  return dispatch => {
      dispatch({type:CLEAR_USER_ROLE});
  }
};