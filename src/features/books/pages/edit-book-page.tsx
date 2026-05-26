import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { BookForm } from '../components/book-form';
import { useBook } from '../hooks/use-books';
import { useUpdateBook } from '../hooks/use-update-book';
import { Loader } from '../../../components/common/loader/loader';
import type { BookFormData } from '../schemas/book.schema';

export const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: book, isLoading: isFetching, error } = useBook(id as string);
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBook();

  const handleSubmit = (data: BookFormData) => {
    if (id) {
      updateBook(
        { id, data },
        {
          onSuccess: () => {
            navigate('/');
          },
        }
      );
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Book not found</h3>
        <Link to="/" className="text-blue-600 hover:underline">Return to library</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Library
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Book</h1>
        <p className="text-gray-500 mt-1">Update the details for "{book.title}".</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
        <BookForm 
          defaultValues={book} 
          onSubmit={handleSubmit} 
          isLoading={isUpdating} 
        />
      </div>
    </div>
  );
};
