import baseService from './baseService';


export const creditCardService = (data) => {
  return baseService.post('/api/payments/charges',data);
};

export const updateService = (payload) => {
    return baseService.put('/api/service/userServices',payload)
};

export const pesapalURL = (payload) => {
    return baseService.post('/api/payments/pesapal',payload);
};

export const pesapalDetails = (params) => {
    return baseService.post('api/payments/pesapal/details',params);
};