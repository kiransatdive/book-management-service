import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  author: z.string().min(1, 'Author is required').max(100, 'Author is too long'),
  genre: z.string().min(1, 'Genre is required'),
  publicationYear: z.number({ message: 'Must be a valid year' }).int().min(1000, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
});

export type BookFormData = z.infer<typeof bookSchema>;
