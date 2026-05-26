import { useState } from 'react';
import { useBooks } from '../hooks/use-books';
import { useDebounce } from '../../../hooks/use-debounce';
import { BookCard } from './book-card';
import { BookSearch } from './book-search';
import { DeleteBookModal } from './delete-book-modal';
import { Loader } from '../../../components/common/loader/loader';
import { Button } from '../../../components/common/button/button';
import { Plus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/book.types';

export const BookList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [page, setPage] = useState(1);
  const limit = 8;

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading, error } = useBooks({
    q: debouncedSearch || undefined,
    genre: genreFilter || undefined,
    _sort: 'id',
    _order: 'desc',
    _page: page,
    _limit: limit,
  });

  const books = data?.data;
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 p-6 rounded-2xl border border-white/60 shadow-sm backdrop-blur-xl">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-600 tracking-tight">Books Library</h1>
          <p className="text-gray-600 font-medium mt-1">Manage your collection of books.</p>
        </div>
        <Link to="/add">
          <Button className="shadow-lg shadow-brand-500/20">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </Link>
      </div>

      <BookSearch
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); setPage(1); }}
        genreFilter={genreFilter}
        onGenreChange={(g) => { setGenreFilter(g); setPage(1); }}
      />

      {isLoading ? (
        <div className="py-12">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-xl border border-red-100">
          Failed to load books. Please try again.
        </div>
      ) : !books?.length ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No books found</h3>
          <p className="text-gray-500 mb-4 text-center max-w-sm">
            {searchQuery || genreFilter 
              ? "We couldn't find any books matching your current filters." 
              : "Your library is empty. Get started by adding a new book."}
          </p>
          {(searchQuery || genreFilter) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setGenreFilter('');
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <div key={book.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-up">
                <BookCard
                  book={book}
                  onDelete={setBookToDelete}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-4 pb-8">
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-white border-gray-200 hover:bg-gray-50"
              >
                Previous
              </Button>
              <span className="text-sm font-medium text-gray-600 bg-white/60 px-4 py-2 rounded-lg border border-white/60 backdrop-blur-sm shadow-sm">
                Page {page} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="bg-white border-gray-200 hover:bg-gray-50"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      <DeleteBookModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        book={bookToDelete}
      />
    </div>
  );
};
