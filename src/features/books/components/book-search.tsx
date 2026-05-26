
import { GENRES } from '../constants/genres';
import { Search, Filter } from 'lucide-react';

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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center bg-white/60 p-4 rounded-2xl border border-white/60 shadow-lg shadow-brand-500/5 backdrop-blur-xl">
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
      <div className="relative sm:w-72 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-400 group-focus-within:text-brand-600 transition-colors">
          <Filter className="h-5 w-5" />
        </div>
        <select
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value)}
          className="flex h-12 w-full rounded-xl border border-gray-200 bg-white/80 pl-11 pr-4 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none transition-all duration-300 hover:bg-white font-medium text-gray-700"
        >
          <option value="">All Genres</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
