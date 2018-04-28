import baseService from './baseService';

export const editProfileService = (user,id) => {
    return baseService.post(`/api/users/${id}`,user);
};

