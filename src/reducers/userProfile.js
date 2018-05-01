import { LOGOUT } from './auth';

export const SAVE_USER = 'SAVE_USER';

const initialState = {
    user: null,
};

const userProfile = ( state = initialState, action) => {
    switch (action.type){
        case SAVE_USER:
            return {
                ...state,
                user:action.payload
            };
        case LOGOUT:
            return {...state, user: null};
        default:
            return state;
    }
};

export default userProfile;