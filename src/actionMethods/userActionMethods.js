import { getCountriesService } from '../services/userServices';
import { GET_COUNTRIES } from '../reducers/countryReducer';
import {SHOW_MODAL} from "../reducers/alertModal";

export const getCountries = () => {
    return dispatch => {
        getCountriesService().then((response)=>{
            dispatch({ type: GET_COUNTRIES, payload: response.data});
        }).catch((error)=>{
            dispatch({type:SHOW_MODAL,payload:{header:'Login',message:error.response.data.error}});
        });
    }
};