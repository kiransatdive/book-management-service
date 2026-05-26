import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card/card';
import { Badge } from '../../../components/ui/badge/badge';
import { Button } from '../../../components/common/button/button';
import type { Book } from '../types/book.types';

interface BookCardProps {
  book: Book;
  onDelete: (book: Book) => void;
}

export const BookCard = ({ book, onDelete }: BookCardProps) => {
  return (
    <Card className="flex h-full flex-col group animate-fade-in-up hover:-translate-y-1.5 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="line-clamp-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">{book.title}</CardTitle>
            <p className="text-sm font-semibold text-brand-600">{book.author}</p>
          </div>
          <Badge variant="secondary" className="flex-shrink-0 whitespace-nowrap shadow-sm">
            {book.publicationYear}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="outline">{book.genre}</Badge>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t border-gray-100 pt-4">
        <Link to={`/edit/${book.id}`}>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => onDelete(book)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
