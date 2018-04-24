import { getCountriesService } from '../services/userServices';
import { GET_COUNTRIES } from '../reducers/countryReducer';

export const getCountries = () => {
    return dispatch => {
        getCountriesService().then((response)=>{
            dispatch({ type: GET_COUNTRIES, payload: response.data});
        }).catch((error)=>{
            console.log('error',error);
        });
    }
};