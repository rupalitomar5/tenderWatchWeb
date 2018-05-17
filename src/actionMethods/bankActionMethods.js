import {DELETE_BANK, ADD_BANK, GET_BANK,SET_ERROR} from '../reducers/bankInformation';
import {ENABLELOADING, DISABLELOADING} from '../reducers/loading';
import {SHOW_MODAL} from '../reducers/alertModal';
import {addBankService, deleteBankService, listBankService,chargeCustomerService} from '../services/bankService';

export const addBankMethod = (data) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        addBankService(data).then((res) => {
            dispatch({type: DISABLELOADING});
                dispatch({type: ADD_BANK, payload: res.data.bankAcc});
                dispatch({
                    type: SHOW_MODAL,
                    payload: {
                        header: 'Bank Account',
                        message: `bank account xxxx-xxxx-${res.data.bankAcc.last4} successfully added`
                    }
                });

        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({
                type: SET_ERROR,
                payload: err.response && err.response.data.message
            });
        })
    }
};

export const listBankMethod = () => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        listBankService().then((res) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: GET_BANK, payload: res.data.data});
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({
                type: SHOW_MODAL,
                payload: {header: 'Error', message: err.response && err.response.data.error || err.message}
            });
        })
    }
};

export const deleteBankMethod = (Id) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        deleteBankService(Id).then((res) => {
            dispatch({type: DISABLELOADING});
            dispatch({type:DELETE_BANK,payload:Id});
            dispatch({type: SHOW_MODAL, payload: {header: 'Bank Account', message: `Account successfully Deleted`}});
        }).catch((err) => {
            dispatch({type: DISABLELOADING});
            dispatch({
                type: SHOW_MODAL,
                payload: {header: 'Error', message: err.response && err.response.data.error || err.message}
            });
        })
    }
};

export const chargeBankMethod = (paymentDetails) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        chargeCustomerService(paymentDetails).then((res)=>{
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Bank Account Payment', message: `Payment Successfully Done`}});
        }).catch((err)=>{
            dispatch({type: DISABLELOADING});
            dispatch({
                type: SHOW_MODAL,
                payload: {header: 'Error', message: err.response && err.response.data.error || err.message}
            });
        });
    }
};