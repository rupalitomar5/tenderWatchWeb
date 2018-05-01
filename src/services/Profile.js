import baseService from './baseService';

export const editProfileService = (user,id) => {
    return baseService.post(`/api/users/${id}`,user);
};

export const getUserProfileService = () => {
    return baseService.get('/api/users/profile');
};

