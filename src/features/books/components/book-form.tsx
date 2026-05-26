import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, type BookFormData } from '../schemas/book.schema';
import { GENRES } from '../constants/genres';
import { Input } from '../../../components/common/input/input';
import { Button } from '../../../components/common/button/button';

interface BookFormProps {
  defaultValues?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => void;
  isLoading?: boolean;
}

export const BookForm = ({ defaultValues, onSubmit, isLoading }: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publicationYear: new Date().getFullYear(),
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
        placeholder="Enter book title"
      />
      
      <Input
        label="Author"
        {...register('author')}
        error={errors.author?.message}
        placeholder="Enter author name"
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
        <select
          {...register('genre')}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select a genre</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-sm text-red-600">{errors.genre.message}</p>}
      </div>

      <Input
        label="Publication Year"
        type="number"
        {...register('publicationYear', { valueAsNumber: true })}
        error={errors.publicationYear?.message}
        placeholder="Enter publication year"
      />

      <div className="pt-4">
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Save Book
        </Button>
      </div>
    </form>
  );
};
