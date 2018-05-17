import _ from 'lodash';

export const ADD_BANK = 'ADD_BANK';
export const DELETE_BANK = 'DELETE_BANK';
export const GET_BANK = 'GET_BANK';
export const SET_ERROR = 'SET_ERROR';

const initialState={
    allAccounts:[],
    error:''
};

export default (state=initialState,action) => {
    switch (action.type){
        case GET_BANK:
            return {...state,allAccounts:action.payload};
        case ADD_BANK:
            state.allAccounts.push(action.payload);
            return {...state,allAccounts:[...state.allAccounts],error:''};
        case DELETE_BANK:
            return {...state,allAccounts:_.filter(state.allAccounts,(o)=>o.id!==action.payload)};
        case SET_ERROR:
            return {...state,error:action.payload};
        default:
            return {...state}
    }
}