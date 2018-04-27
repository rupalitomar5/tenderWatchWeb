import 'bootstrap/dist/css/bootstrap.min.css';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import isLoading from './loading';
import alertModal from './alertModal';
import userRole from './userRole';
import formData from './formData';
import tenders from './tenders';

export default combineReducers({
    router: routerReducer,
    auth,
    isLoading,
    alertModal,
    userRole,
    formData,
    tenders
});