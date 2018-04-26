import jwt from 'jsonwebtoken';
import {history} from '../store';
import {LOGOUT, LOGIN} from '../reducers/auth';
import {SHOW_MODAL} from '../reducers/alertModal';
import {CHANGE_USER_ROLE, CLEAR_USER_ROLE} from '../reducers/userRole';
import {
    loginService,
    logoutService,
    registerService,
    forgotPasswordService,
    socialAuthService
} from '../services/authServices';
import {ENABLELOADING, DISABLELOADING} from '../reducers/loading';

export const loginMethod = (credentials) => {
  return dispatch => {
      dispatch({type:ENABLELOADING});
      loginService(credentials).then( response => {
          dispatch({type:DISABLELOADING});
          localStorage.setItem('auth_user', response.data.token);
          dispatch({type:LOGIN,payload: jwt.decode(response.data.token)});
          history.push('/');
      }).catch( error => {
          dispatch({type:DISABLELOADING});
          dispatch({type:SHOW_MODAL,payload:{header:'Login',message:error.response.data.error}});
      });
  }
};

export const logoutMethod = () => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        logoutService().then(response => {
            dispatch({type: DISABLELOADING});
            if (response.data === 'OK') {
                localStorage.removeItem('auth_user');
                dispatch({type: LOGOUT});
            } else {
                throw Error(response.data.Message);
            }
        }).catch( error => {
            dispatch({type:DISABLELOADING});
            dispatch({type:SHOW_MODAL,payload:{header:'Login',message:error.response.data.error}});
        });
    }
};

export const registerMethod = (regDetails) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        let regForm = new FormData();
        for (let key in regDetails) {
            regForm.append(key, regDetails[key]);
        }
        registerService(regForm).then((response) => {
            localStorage.setItem('auth_user', response.data.token);
            dispatch({type: LOGIN, payload: response.data.user});
            dispatch({type: DISABLELOADING});
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
        })
    }
};

export const forgotPasswordMethod = (payload) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        return forgotPasswordService(payload).then((response) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Forgot Password', message: 'sent mail to your account'}});
            return true;
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.message}});
            return false;
        });
    }
};

export const setUserRoleMethod = (role) => {
    return dispatch => {
        dispatch({type: CHANGE_USER_ROLE, payload: role})
    }
};

export const clearRoleMethod = () => {
    return dispatch => {
        dispatch({type: CLEAR_USER_ROLE});
    }
};

export const socialLoginMethod = (payload, role, type) => {
    return dispatch => {
        payload.tokenId || payload.signedRequest && dispatch({type: ENABLELOADING});
        socialAuthService({token: payload.tokenId || payload.accessToken , role},type).then((res) => {
            dispatch({type: DISABLELOADING});
            localStorage.setItem('auth_user', res.data.token);
            dispatch({type: LOGIN, payload: res.data.user});
        }).catch((err)=>{
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
        });
    }
};