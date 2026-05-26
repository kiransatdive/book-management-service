export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  pdfUrl?: string;
  driveLink?: string;
  coverImage?: string;
}
