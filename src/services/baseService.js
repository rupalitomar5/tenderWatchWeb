import axios from 'axios';

const baseService  = axios.create({ baseURL: 'http://192.168.200.63:4000' });

baseService.interceptors.request.use( config => {
    if( localStorage.getItem('auth_user') ) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('auth_user')}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default baseService;