import { apiClient } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { User } from '../../features/users/types/user.types';

export const UsersService = {
  getUsers: () => {
    return apiClient.get<never, User[]>(ENDPOINTS.USERS || '/users');
  },
};
