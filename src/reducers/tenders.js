import {LOGOUT} from './auth';
import _ from 'lodash';

export const GET_ALL_TENDERS = 'GET_ALL_TENDERS';
export const GET_TENDER = 'GET_TENDER';
export const DELETE_TENDER = 'DELETE_TENDER';


const initialState = {
    allTenders:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TENDERS:
            return {...state,allTenders:action.payload};
        case LOGOUT:
            return {...state,allTenders:[]};
        case DELETE_TENDER:
            return {...state,allTenders:_.filter(state.allTenders,(o)=>o._id!==action.payload)};
        case GET_TENDER:
            return {...state,current_tender:action.payload};
        default:
            return {...state};
    }
}