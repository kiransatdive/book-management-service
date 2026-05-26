import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/layouts/main-layout/main-layout';
import { BooksPage } from '../features/books/pages/books-page';
import { AddBookPage } from '../features/books/pages/add-book-page';
import { EditBookPage } from '../features/books/pages/edit-book-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <BooksPage />,
      },
      {
        path: 'add',
        element: <AddBookPage />,
      },
      {
        path: 'edit/:id',
        element: <EditBookPage />,
      },
    ],
  },
]);
