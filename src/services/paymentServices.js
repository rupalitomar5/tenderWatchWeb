import baseService from './baseService';


export const creditCardService = (data) => {
  return baseService.post('/api/payments/charges',data);
};

export const updateService = (payload) => {
    return baseService.put('/api/service/userServices',payload)
};