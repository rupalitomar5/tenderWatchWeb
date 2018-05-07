import baseService from './baseService';

export const editProfileService = (user,id) => {
    return baseService.post(`/api/users/${id}`,user);
};

export const getUserProfileService = () => {
    return baseService.get('/api/users/profile');
};

export const getNotificationService = () => {
    return baseService.get('/api/notification');
};

export const deleteNotificationService = (notification) => {
  return baseService.delete('/api/notification/delete',{data:{notification}});
};

export const readNotificationService = (notification) => {
    return baseService.put(`api/notification/${notification}`);
};

export const getSenderDetailsService = (userId) => {
    return baseService.get(`api/users/${userId}`);
};
export const addReviewService = (review) => {
    return baseService.post('api/review/',review);
};

export const updateReviewService = (review,review_id) => {
  return baseService.put(`api/review/${review_id}`,review);
};