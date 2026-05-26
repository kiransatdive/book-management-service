import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../../../api/services/users.service';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.getUsers(),
  });
};
