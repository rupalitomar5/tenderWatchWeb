import 'bootstrap/dist/css/bootstrap.min.css';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import isLoading from './loading';
import alertModal from './alertModal';
import userRole from './userRole';

export default combineReducers({
    router: routerReducer,
    auth,
    isLoading,
    alertModal,
    userRole
});