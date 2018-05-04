import baseService from './baseService';

export const getAllTendersServices = () => {
  return baseService.post('/api/tender/getTenders');
};

export const uploadTenderServices = (payload) => {
  return baseService.post('/api/tender',payload);
};

export const deleteTenderServices = (index) => {
  return baseService.delete(`/api/tender/${index}`);
};

export const getTenderService = (index) => {
  return baseService.get(`/api/tender/${index}`);
};

export const updateTenderService = (payload,index) => {
  return baseService.put(`/api/tender/${index}`,payload);
};

export const getFavoriteTendersService = () => {
  return baseService.get('/api/tender/getTenders');
};
export const addFavoriteTenderService = ( tenderId ) => {
    return baseService.put(`/api/tender/favorite/${tenderId}`);
};

export const deleteFavoriteTenderService = ( tenderId ) =>{
    return baseService.delete(`/api/tender/favorite/${tenderId}`);
};