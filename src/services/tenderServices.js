import baseService from './baseService';

export const getAllTendersServices = () => {
  return baseService.post('/api/tender/getTenders');
};