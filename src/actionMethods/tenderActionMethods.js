import {
    GET_ALL_TENDERS,
    DELETE_TENDER,
    GET_TENDER,
    ADD_TENDER,
    GET_FAVORITE_TENDERS,
    ADD_FAVORITE_TENDER,
    DELETE_FAVORITE_TENDER,
    UPDATE_TENDER,
    INTERESTED_TENDER
} from '../reducers/tenders';
import {DISABLELOADING, ENABLELOADING} from '../reducers/loading';
import {SHOW_MODAL} from '../reducers/alertModal';
import {
    getAllTendersServices,
    uploadTenderServices,
    deleteTenderServices,
    getTenderService,
    updateTenderService,
    getFavoriteTendersService,
    addFavoriteTenderService,
    deleteFavoriteTenderService,
    interestedTenderService
} from '../services/tenderServices';

export const getAllTendersMethod = () => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        getAllTendersServices().then((res) => {
            dispatch({type: DISABLELOADING});
            !res.data.message && dispatch({type: GET_ALL_TENDERS, payload: res.data});
        }).catch((error) => {
            dispatch({type: DISABLELOADING});
        })
    }
};

export const uploadTenderMethod = (tender) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        tender = tender.country && tender.country._id ? {...tender, country: tender.country._id} : tender;
        tender = tender.category && tender.category._id ? {...tender, category: tender.category._id} : tender;
        let tenderForm = new FormData();
        for (let key in tender) {
            tenderForm.append(key, tender[key]);
        }
        return uploadTenderServices(tenderForm).then((res) => {
            dispatch({type: ADD_TENDER, payload: tender});
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Add Tender', message: 'tender successfully added!'}});
            return true;
        }).catch((error) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
            return false;
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
        }).catch((error) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
        })
    }
};

export const getTenderMethod = (index) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        getTenderService(index).then((res) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: GET_TENDER, payload: res.data});
        }).catch((error) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
        });
    }
};

export const updateTenderMethod = (data, index) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        data = data.country && data.country._id ? {...data, country: data.country._id} : data;
        data = data.category && data.category._id ? {...data, category: data.category._id} : data;
        let regForm = new FormData();
        for (let key in data) {
            regForm.append(key, data[key]);
        }
        return updateTenderService(regForm, index).then((res) => {
            console.log('res', res);
            dispatch({type: DISABLELOADING});
            dispatch({type: UPDATE_TENDER, payload: res.data});
            dispatch({type: SHOW_MODAL, payload: {header: 'Tender', message: 'tender successfully updated!'}});
            return true;
        }).catch((error) => {
            dispatch({type: DISABLELOADING});
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
            return false;
        })
    }
};

export const getFavoriteTenders = () => {
    return dispatch => {
        getFavoriteTendersService().then(response => {
            dispatch({
                type: GET_FAVORITE_TENDERS,
                payload: response.data.message ? response.data.message : response.data
            });
        }).catch(error => {
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
        })
    }
};

export const addFavoriteTender = tenderId => {
    return dispatch => {
        addFavoriteTenderService(tenderId).then(response => {
            dispatch({type: ADD_FAVORITE_TENDER, payload: response.data});
        }).catch(error => {
            dispatch({type: SHOW_MODAL, payload: {header: 'Error', message: error.response.data.error}});
        });
    }
};

export const deleteFavoriteTender = (tenderId, userId) => {
    return dispatch => {
        deleteFavoriteTenderService(tenderId).then(response => {
            dispatch({type: DELETE_FAVORITE_TENDER, payload: userId});
        }).catch(error => {
            dispatch({
                type: SHOW_MODAL,
                payload: {header: 'Error', message: error.response.data && error.response.data.error || error.message}
            });
        });
    }
};

export const interestedTenderMethod = (tenderId, userId) => {
    return dispatch => {
        dispatch({type: ENABLELOADING});
        interestedTenderService(tenderId).then(() => {
            dispatch({type: DISABLELOADING});
            dispatch({type: INTERESTED_TENDER, payload: {tenderId, userId}});
            dispatch({
                type: SHOW_MODAL,
                payload: {header: 'Tender', message: 'you are now interested in this tender'}
            });
        }).catch((err) => {
            dispatch({type: ENABLELOADING});
            dispatch({
                type: SHOW_MODAL,
                payload: {header: 'Error', message: err.response && err.response.data && err.response.data.error || err.message}
            });
        })
    }
};