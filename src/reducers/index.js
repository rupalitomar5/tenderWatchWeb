import 'bootstrap/dist/css/bootstrap.min.css';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import isLoading from './loading';
import alertModal from './alertModal';

export default combineReducers({
    router: routerReducer,
    auth,
    isLoading,
    alertModal
});