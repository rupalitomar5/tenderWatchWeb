import {GET_ALL_TENDERS} from '../reducers/tenders';
import {getAllTendersServices} from '../services/tenderServices';

export const getAllTendersMethod = () => {
    return dispatch => {
        getAllTendersServices().then((res)=>{
            dispatch({type:GET_ALL_TENDERS,payload:res.data});
        }).catch((err)=>{

        })
    }
};