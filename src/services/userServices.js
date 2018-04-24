import baseService from './baseService';

export const getCountriesService = () => {
    return baseService.get('api/auth/country');
};