import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { BookForm } from '../components/book-form';
import { useCreateBook } from '../hooks/use-create-book';
import type { BookFormData } from '../schemas/book.schema';

export const AddBookPage = () => {
  const navigate = useNavigate();
  const { mutate: createBook, isPending } = useCreateBook();

  const handleSubmit = (data: BookFormData) => {
    createBook(data, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Library
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Book</h1>
        <p className="text-gray-500 mt-1">Enter the details of the new book below.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
        <BookForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
};
