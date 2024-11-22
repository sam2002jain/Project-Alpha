
import apiClient from './apiclient';

export const getUserDetails = (userId) => {
  return apiClient.get(`/users/${userId}`);
};

//for signUp
export const createUser = (userData) => {
  return apiClient.post('/users', userData);
};
