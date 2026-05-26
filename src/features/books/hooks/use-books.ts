import { useQuery } from '@tanstack/react-query';
import { BooksService } from '../../../api/services/books.service';

export const useBooks = (params?: { q?: string; genre?: string; _sort?: string; _order?: string }) => {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => BooksService.getBooks(params),
  });
};

export const useBook = (id: string | number) => {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => BooksService.getBook(id),
    enabled: !!id,
  });
};
