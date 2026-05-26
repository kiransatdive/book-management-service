import { Modal } from '../../../components/common/modal/modal';
import { Button } from '../../../components/common/button/button';
import { useDeleteBook } from '../hooks/use-delete-book';
import type { Book } from '../types/book.types';

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export const DeleteBookModal = ({ isOpen, onClose, book }: DeleteBookModalProps) => {
  const { mutate: deleteBook, isPending } = useDeleteBook();

  if (!book) return null;

  const handleDelete = () => {
    deleteBook(book.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Book">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong className="text-gray-900">{book.title}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isPending}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
