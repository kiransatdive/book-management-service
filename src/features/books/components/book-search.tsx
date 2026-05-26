
import { GENRES } from '../constants/genres';
import { Search } from 'lucide-react';

interface BookSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  genreFilter: string;
  onGenreChange: (value: string) => void;
}

export const BookSearch = ({
  searchQuery,
  onSearchChange,
  genreFilter,
  onGenreChange,
}: BookSearchProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col bg-white/60 p-4 rounded-2xl border border-white/60 shadow-lg shadow-brand-500/5 backdrop-blur-xl">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-400 group-focus-within:text-brand-600 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex h-12 w-full rounded-xl border border-gray-200 bg-white/80 pl-11 pr-4 py-2 text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 hover:bg-white"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center px-1">
        <button
          onClick={() => onGenreChange('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            genreFilter === ''
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-brand-600 border border-gray-200 shadow-sm'
          }`}
        >
          All Genres
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              genreFilter === genre
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-brand-600 border border-gray-200 shadow-sm'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};
