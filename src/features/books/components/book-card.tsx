import { Link } from 'react-router-dom';
import { Pencil, Trash2, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card/card';
import { Badge } from '../../../components/ui/badge/badge';
import { Button } from '../../../components/common/button/button';
import type { Book } from '../types/book.types';

interface BookCardProps {
  book: Book;
  onDelete: (book: Book) => void;
}

export const BookCard = ({ book, onDelete }: BookCardProps) => {
  const handleOpenPdf = async (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('data:application/pdf;base64,')) {
      e.preventDefault();
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch (error) {
        console.error('Error opening PDF:', error);
        window.open(url, '_blank');
      }
    }
  };

  return (
    <Card className="flex h-full flex-col group animate-fade-in-up hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      {book.coverImage && (
        <div className="w-full h-56 bg-slate-50 border-b border-gray-100 shrink-0 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Optional: Add a blurred background of the same image for a premium look */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl scale-110"
            style={{ backgroundImage: `url(${book.coverImage})` }}
          />
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="relative z-10 max-w-full max-h-full object-contain drop-shadow-xl rounded-sm"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <CardTitle className="line-clamp-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">{book.title}</CardTitle>
            <p className="text-sm font-semibold text-brand-600">{book.author}</p>
          </div>
          <Badge variant="secondary" className="flex-shrink-0 whitespace-nowrap shadow-sm">
            {book.publicationYear}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-0 pb-4">
        <Badge variant="outline">{book.genre}</Badge>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
        {book.driveLink && (
          <a href={book.driveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="secondary" size="sm" className="w-full bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-300">
              <ExternalLink className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span>Link</span>
            </Button>
          </a>
        )}
        {book.pdfUrl && (
          <a 
            href={book.pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1"
            onClick={(e) => handleOpenPdf(e, book.pdfUrl!)}
          >
            <Button variant="secondary" size="sm" className="w-full bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100 hover:text-violet-700 hover:border-violet-300">
              <FileText className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span>PDF</span>
            </Button>
          </a>
        )}
        <Link to={`/edit/${book.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300">
            <Pencil className="mr-1.5 h-4 w-4 flex-shrink-0" />
            <span>Edit</span>
          </Button>
        </Link>
        <Button variant="secondary" size="sm" onClick={() => onDelete(book)} className="flex-1 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300">
          <Trash2 className="mr-1.5 h-4 w-4 flex-shrink-0" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
