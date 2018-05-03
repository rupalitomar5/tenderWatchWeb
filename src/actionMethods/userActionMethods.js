import { getCountriesService,getCategoriesService,getSupportService } from '../services/userServices';
import { GET_COUNTRIES,GET_CATEGORIES } from '../reducers/formData';
import {SHOW_MODAL} from "../reducers/alertModal";
import {DISABLELOADING,ENABLELOADING} from "../reducers/loading";

export const getCountries = () => {
    return dispatch => {
        getCountriesService().then((response)=>{
            dispatch({ type: GET_COUNTRIES, payload: response.data});
        }).catch((error)=>{
            dispatch({type:SHOW_MODAL,payload:{header:'fetch data',message:error.message || error.response.data.error}});
        });
    }
};

export const getCategories = () => {
    return dispatch => {
        getCategoriesService().then((res)=>{
            dispatch({ type: GET_CATEGORIES, payload: res.data});
        }).catch((err)=>{
            dispatch({type:SHOW_MODAL,payload:{header:'fetch data',message:err.message || err.response.data.error }});
        });
    }
};

export const getSupportMethod = (payload) => {
  return dispatch => {
      dispatch({type: ENABLELOADING});
      getSupportService(payload).then((res)=>{
          dispatch({type: DISABLELOADING});
          dispatch({type:SHOW_MODAL,payload:{header:'Support',message:'email successfully sent'}});
      }).catch((err)=>{
          dispatch({type: DISABLELOADING});
          dispatch({type:SHOW_MODAL,payload:{header:'Support',message:err.message || err.response.data.error }});
      })
  }
};