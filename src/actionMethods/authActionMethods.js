import { history } from '../store';
import {LOGOUT,LOGIN} from '../reducers/auth';
import {DISABLELOADING,ENABLELOADING} from '../reducers/loading';
import { loginService, logoutService,registerService,forgotPasswordService } from '../services/authServices';
import {SHOW_MODAL} from '../reducers/alertModal';

export const loginMethod = (credentials) => {
    debugger;
  return dispatch => {
      loginService(credentials).then( response => {
          console.log('response',response);
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
            console.log('response',response);
            debugger;
            if(response.data === 'OK'){
              localStorage.removeItem('auth_user');
                dispatch({type:LOGOUT});
            }else {
                throw Error(response.data.Message);
            }
        }).catch( error => {
            console.log('error',error);
            debugger;
            //alert(error);
        });
    }
};

export const registerMethod = (regDetails) => {
    debugger;
  return dispatch => {
      let regForm = new FormData();
      regForm.append("email",regDetails.email);
      regForm.append("password",regDetails.password);
      regForm.append('role',regDetails.role);
      regForm.append('image',regDetails.profilePhoto);
        registerService(regForm).then((response)=>{
            console.log(response);
            localStorage.setItem('auth_user',response.data.token);
            dispatch({type:LOGIN,payload:response.data.user});
        }).catch((err)=>{

        })
  }
};

export const forgotPasswordMethod = (payload) => {
  return dispatch => {
      forgotPasswordService(payload).then((response)=>{
          dispatch({type:SHOW_MODAL,payload:{header:'Forgot Password',message:'sent mail to your account'}})
      }).catch((err)=>{
          dispatch({type:SHOW_MODAL,payload:{header:'Error',message:err.message}})
      });
  }
};