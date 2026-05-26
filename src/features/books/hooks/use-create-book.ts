import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BooksService } from '../../../api/services/books.service';
import toast from 'react-hot-toast';

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BooksService.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book added successfully');
    },
    onError: () => {
      toast.error('Failed to add book');
    },
  });
};
