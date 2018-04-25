import baseService from './baseService';

export const getAllTendersServices = () => {
  return baseService.get('/api/tender');
};