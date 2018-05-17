import {LOGOUT} from './auth';
import _ from 'lodash';

export const GET_ALL_TENDERS = 'GET_ALL_TENDERS';
export const GET_TENDER = 'GET_TENDER';
export const ADD_TENDER = 'ADD_TENDER';
export const DELETE_TENDER = 'DELETE_TENDER';
export const GET_FAVORITE_TENDERS = 'GET_FAVORITE_TENDERS';
export const ADD_FAVORITE_TENDER = 'ADD_FAVORITE_TENDER';
export const DELETE_FAVORITE_TENDER = 'DELETE_FAVORITE_TENDER';
export const UPDATE_TENDER = 'UPDATE_TENDER';
export const INTERESTED_TENDER = 'INTERESTED_TENDER';
export const SEARCH_KEY = 'SEARCH_KEY';

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
        case UPDATE_TENDER:
            return {...state,current_tender:action.payload};
        case GET_FAVORITE_TENDERS:
            return{
                ...state,
                favoriteTenders:action.payload
            };
        case ADD_FAVORITE_TENDER:
            let current_tender = state.current_tender;
            if(current_tender && action.payload._id===current_tender._id) current_tender.favorite = action.payload.favorite;
            return _.cloneDeep({
                ...state,
                current_tender
            });
        case DELETE_FAVORITE_TENDER:
            let current_tender1 = state.current_tender;
            current_tender1 && _.pull(current_tender1.favorite,action.payload.userId);
            return{
                ...state,
                current_tender: current_tender1
            };
        case INTERESTED_TENDER:
            debugger;
            const index= _.findIndex(state.allTenders,{'_id':action.payload.tenderId});
            index>-1 && state.allTenders[index].interested.push(action.payload.userId);
            index>-1 && state.current_tender && state.current_tender.interested.push(action.payload.userId);
            return {...state,allTenders:[...state.allTenders],current_tender:{...state.current_tender}};
        case SEARCH_KEY:
            return{
                ...state,
                searchKey:action.payload
            };
        default:
            return {...state};
    }
}