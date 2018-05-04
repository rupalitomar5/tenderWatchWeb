import {LOGOUT} from './auth';
import _ from 'lodash';

export const SAVE_USER = 'SAVE_USER';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const initialState = {
    user: null,
    notifications: []
};

const userProfile = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload
            };
        case READ_NOTIFICATION:
            let index=_.findIndex(state.notifications,{'_id':action.payload});
            let notification=state.notifications[index];
            notification={...notification,read:true};
            state.notifications.splice(index,1);
            return {
                ...state,
                notifications:[...state.notifications,notification]
            };
        case REMOVE_NOTIFICATION:
            state.notifications.splice(_.findIndex(state.notifications,{'_id':action.payload}),1);
            return {
                ...state,
                notifications:[...state.notifications]
            };
        default:
            return state;
    }
};

export default userProfile;