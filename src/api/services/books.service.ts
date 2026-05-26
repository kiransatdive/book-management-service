import { apiClient } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { Book } from '../../features/books/types/book.types';
import type { BookFormData } from '../../features/books/schemas/book.schema';

import axios from 'axios';
import { ENV } from '../../config/env';

export const BooksService = {
  getBooks: async (params?: { q?: string; genre?: string; _sort?: string; _order?: string; _page?: number; _limit?: number }) => {
    const response = await axios.get<Book[]>(ENDPOINTS.BOOKS, {
      baseURL: ENV.API_BASE_URL,
      params,
    });
    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0', 10),
    };
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
