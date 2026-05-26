import { apiClient } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { Book } from '../../features/books/types/book.types';
import type { BookFormData } from '../../features/books/schemas/book.schema';

export const BooksService = {
  getBooks: (params?: { q?: string; genre?: string; _sort?: string; _order?: string }) => {
    return apiClient.get<never, Book[]>(ENDPOINTS.BOOKS, { params });
  },

  getBook: (id: string | number) => {
    return apiClient.get<never, Book>(ENDPOINTS.BOOK_DETAIL(id));
  },

  createBook: (data: BookFormData) => {
    return apiClient.post<never, Book>(ENDPOINTS.BOOKS, data);
  },

  updateBook: (id: string | number, data: BookFormData) => {
    return apiClient.put<never, Book>(ENDPOINTS.BOOK_DETAIL(id), data);
  },

  deleteBook: (id: string | number) => {
    return apiClient.delete<never, void>(ENDPOINTS.BOOK_DETAIL(id));
  },
};
