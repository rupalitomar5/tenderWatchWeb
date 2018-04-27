export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';

const initialState = {

};

const country = ( state = initialState, action) =>{
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        case GET_CATEGORIES:
            return {...state,categories:action.payload};
        default:
            return state;
    }
};

export default country;