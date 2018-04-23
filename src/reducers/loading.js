
export const ENABLELOADING = 'ENABLELOADING';
export const DISABLELOADING = 'DISABLELOADING';

export default (state=false,action) => {
    switch (action.type){
        case ENABLELOADING:
            return true;
        case DISABLELOADING:
            return false;
        default:
            return state;
    }
}