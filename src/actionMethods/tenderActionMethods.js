import {GET_ALL_TENDERS} from '../reducers/tenders';
import {DISABLELOADING,ENABLELOADING} from '../reducers/loading';
import {SHOW_MODAL} from '../reducers/alertModal';
import {getAllTendersServices, uploadTenderServices} from '../services/tenderServices';

export const getAllTendersMethod = () => {
    return dispatch => {
        getAllTendersServices().then((res) => {
            debugger;
            !res.data.message && dispatch({type: GET_ALL_TENDERS, payload: res.data});
        }).catch((err) => {

        })
    }
};

export const uploadTenderMethod = (tender) => {
    debugger;
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
            debugger;
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: err.message}});
        });
    }
};