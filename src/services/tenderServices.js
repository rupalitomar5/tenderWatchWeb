import baseService from './baseService';

export const getAllTendersServices = () => {
  return baseService.post('/api/tender/getTenders');
};

export const uploadTenderServices = (payload) => {
  return baseService.post('/api/tender',payload);
};