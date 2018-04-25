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
        default:
            return {...state}
    }
}