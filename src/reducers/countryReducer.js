export const GET_COUNTRIES = 'GET_COUNTRIES';

const initialState = {

};

const country = ( state = initialState, action) =>{
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        default:
            return state;
    }
};

export default country;