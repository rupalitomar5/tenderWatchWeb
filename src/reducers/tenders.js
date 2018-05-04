import {LOGOUT} from './auth';
import _ from 'lodash';

export const GET_ALL_TENDERS = 'GET_ALL_TENDERS';
export const GET_TENDER = 'GET_TENDER';
export const ADD_TENDER = 'ADD_TENDER';
export const DELETE_TENDER = 'DELETE_TENDER';
export const GET_FAVORITE_TENDERS = 'GET_FAVORITE_TENDERS';

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
        case ADD_TENDER:
            state.allTenders.push(action.payload);
            return _.cloneDeep(state);
        case GET_FAVORITE_TENDERS:
            debugger;
            return{
                ...state,
                favoriteTenders:action.payload
            };
        default:
            return {...state};
    }
}