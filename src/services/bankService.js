import baseService from './baseService';

export const addBankService = (data) => {
    return baseService.post('/api/payments/bank/android/charges', {
        ...data, "countryCode": "US",
        "currency": "USD",
    });
};

export const listBankService = () => {
    return baseService.get('/api/payments/bank/charges');
};

export const deleteBankService = (data) => {
    return baseService.delete('/api/payments/bank/charges', {data: {bankId: data}});
};

export const chargeCustomerService = (source) => {
    return baseService.post('/api/payments/bank/charges', source)
};