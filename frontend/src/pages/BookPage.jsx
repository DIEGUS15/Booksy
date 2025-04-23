import React, { useEffect, useState } from "react";
import { useBooks } from "../context/BookContext";
import Modal from "../components/Modal";
import BookForm from "../components/BookForm";
import "../styles/Books/ViewBooks.css";

function BookPage() {
  const { books, loading, getBooks, deleteBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  //Abrir el modal para crear un libro
  const handleOpenCreateModal = () => {
    setCurrentBook(null); //Nos aseguramos que no hay un libro seleccionado para editar
    setIsModalOpen(true);
  };

  //Abrir modal para editar libro
  const handleOpenEditModal = (book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  //Cerrar el modal del formulario
  const handleCloseModal = () => {
    setIsModalOpen(false);
    //Se deja un tiempo para que la animación termine antes de resetear el libro actual
    setTimeout(() => setCurrentBook(null), 300);
  };

  //Confirmar eliminación del libro
  const handleConfirmDelete = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  //Cancelar eliminación
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  //Proceder con la eliminación
  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete._id);
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
      } catch (error) {
        console.error("Error deleting book:");
      }
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    // Resetear el libro actual después de la animación
    setTimeout(() => setCurrentBook(null), 300);
  };

  if (loading) return <div className="loading-container">Loading books...</div>;

  return (
    <div className="book-container">
      <div className="book-header">
        <h1>Lista de libros</h1>
        <button className="add-book-btn" onClick={handleOpenCreateModal}>
          Añadir Libro
        </button>
      </div>

      {books.length === 0 ? (
        <p className="no-books-message">No books available.</p>
      ) : (
        <div className="book-cards">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              {book.portada && (
                <div className="book-cover">
                  <img src={book.portada} alt={`Portada de ${book.title}`} />
                </div>
              )}
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Year: {book.year || "Desconocido"}</p>
              <p>Genre: {book.genre}</p>
              {book.sypnosis && (
                <p className="book-sypnosis">Sypnosis: {book.sypnosis}</p>
              )}

              <div className="book-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleOpenEditModal(book)}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleConfirmDelete(book)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para el formulario (crear/editar) */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentBook ? "Editar libro" : "Crear nuevo libro"}
      >
        <BookForm
          bookToEdit={currentBook}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        title="Confirmar eliminación"
      >
        <div className="delete-confirmation">
          <p>
            ¿Estás seguro de que deseas eliminar el libro "{bookToDelete?.title}
            "?
          </p>
          <p className="delete-warning">Esta acción no se puede deshacer.</p>

          <div className="delete-actions">
            <button onClick={handleDeleteBook} className="confirm-delete-btn">
              Sí, eliminar
            </button>
            <button onClick={handleCancelDelete} className="cancel-delete-btn">
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookPage;
