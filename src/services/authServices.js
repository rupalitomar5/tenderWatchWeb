import axios from 'axios';
import baseService from './baseService';

export const loginService = (credentials) => {
  return axios.post('/api/auth/login',credentials);
};

export const logoutService = () => {
  return baseService.delete('/api/users',
      {data:{deviceId:"website"}});
};

export const registerService = (userDetails) => {
  return axios.post('/api/auth/register',userDetails);
};

export const forgotPasswordService = (payload) => {
  return axios.post('/api/auth/forgot',payload);
};