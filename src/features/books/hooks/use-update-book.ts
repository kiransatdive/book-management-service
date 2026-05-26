import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BooksService } from '../../../api/services/books.service';
import type { BookFormData } from '../schemas/book.schema';
import toast from 'react-hot-toast';

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: BookFormData }) =>
      BooksService.updateBook(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', variables.id] });
      toast.success('Book updated successfully');
    },
    onError: () => {
      toast.error('Failed to update book');
    },
  });
};
