import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import "../styles/Books/BookForm.css";

function BookForm({ bookToEdit, onSuccess, onCancel }) {
  const { createBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
    sypnosis: "",
    portada: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!bookToEdit;

  //Carga los datos del libro si estamos en modo edición
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || "",
        author: bookToEdit.author || "",
        year: bookToEdit.year || "",
        genre: bookToEdit.genre || "",
        sypnosis: bookToEdit.sypnosis || "",
        portada: bookToEdit.portada || "",
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      if (isEditing) {
        //Si estamos editando, incluir el ID del libro
        await updateBook({ ...formData, _id: bookToEdit._id });
      } else {
        //Si estamos creando un nuevo libro
        await createBook(formData);
      }

      //Resetea el formulario si no estamos editando
      if (!isEditing) {
        setFormData({
          title: "",
          author: "",
          year: "",
          genre: "",
          sypnosis: "",
          portada: "",
        });
      }
      // Notificar al componente padre que la operación fue exitosa
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} the book:`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="form-input"
        required
      />

      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        className="form-input"
        required
      />

      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
        className="form-input"
      />

      <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        className="form-input"
        required
      >
        <option value="">Selecciona un género</option>
        <option value="Horror">Horror</option>
        <option value="Comedy">Comedy</option>
        <option value="Mystery">Mystery</option>
        <option value="Suspense">Suspense</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science fiction">Science fiction</option>
      </select>

      <textarea
        name="sypnosis"
        value={formData.sypnosis}
        onChange={handleChange}
        placeholder="Sypnosis"
        className="form-input"
        rows="4"
      />

      <input
        type="text"
        name="portada"
        value={formData.portada}
        onChange={handleChange}
        placeholder="Portada"
        className="form-input"
      />

      <div className="form-buttons">
        <button
          type="submit"
          className="form-button submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditing
              ? "Actualizando..."
              : "Creando..."
            : isEditing
            ? "Actualizar Libro"
            : "Crear Libro"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="form-button cancel-btn"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
