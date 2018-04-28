import {GET_ALL_TENDERS,DELETE_TENDER,GET_TENDER} from '../reducers/tenders';
import {DISABLELOADING, ENABLELOADING} from '../reducers/loading';
import {SHOW_MODAL} from '../reducers/alertModal';
import {getAllTendersServices, uploadTenderServices, deleteTenderServices,getTenderService} from '../services/tenderServices';

export const getAllTendersMethod = () => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        getAllTendersServices().then((res) => {
            dispatch({type: DISABLELOADING});
            !res.data.message && dispatch({type: GET_ALL_TENDERS, payload: res.data});
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
        })
    }
};

export const uploadTenderMethod = (tender) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        let tenderForm = new FormData();
        for (let key in tender) {
            tenderForm.append(key, tender[key]);
        }
        uploadTenderServices(tenderForm).then((res) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Add Tender', message: 'tender successfully added!'}});
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
        });
    }
};

export const deleteTenderMethod = (index) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        deleteTenderServices(index).then((res) => {
            dispatch({type: DELETE_TENDER, payload: index});
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Delete', message: 'tender successfully deleted'}});
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
        })
    }
};

export const getTenderMethod = (index) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        getTenderService(index).then((res)=>{
            dispatch({type: DISABLELOADING});
            dispatch({type:GET_TENDER,payload:res.data});
        }).catch((err)=>{
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.response.data.error}});
        });
    }
};