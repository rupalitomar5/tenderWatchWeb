const initialState = {
    user: localStorage.getItem('auth_user') || null,
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload};
        case LOGOUT:
            return {...state, user: null};
        default:
            return {...state}
    }
}