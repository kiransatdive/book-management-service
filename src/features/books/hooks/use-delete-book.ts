import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BooksService } from '../../../api/services/books.service';
import toast from 'react-hot-toast';

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BooksService.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete book');
    },
  });
};
