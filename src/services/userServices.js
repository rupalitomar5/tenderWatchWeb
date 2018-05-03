import baseService from './baseService';

export const getCountriesService = () => {
    return baseService.get('api/auth/country');
};

export const getCategoriesService = () => {
    return baseService.get('api/auth/category');
};

export const getSupportService = (payload) => {
  return baseService.post('api/support/',payload);
};