import baseService from './baseService';

export const changePasswordService = (credentials, user) => {
  return baseService.post(`api/users/changePassword/${user}`,credentials);
};