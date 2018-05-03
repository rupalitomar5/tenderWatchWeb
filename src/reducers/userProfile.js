import {LOGOUT} from './auth';

export const SAVE_USER = 'SAVE_USER';
export const GET_NOTIFICATION = '';

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
        default:
            return state;
    }
};

export default userProfile;