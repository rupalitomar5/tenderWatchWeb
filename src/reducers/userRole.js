
export const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE';
export const CLEAR_USER_ROLE = 'CLEAR_USER_ROLE';

export default (state='',action) => {
    switch (action.type){
        case CHANGE_USER_ROLE:
            return action.payload;
        case CLEAR_USER_ROLE:
            return '';
        default:
            return state;
    }

}