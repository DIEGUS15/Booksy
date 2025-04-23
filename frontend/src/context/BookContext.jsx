import { createContext, useContext, useState, useEffect } from "react";
import {
  getBooksRequest,
  // getBookRequest,
  createBookRequest,
  updateBookRequest,
  deleteBookRequest,
} from "../api/book";

export const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooksRequest();
      setBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
      setErrors(
        error.response?.data ||
          (error.message ? [error.message] : ["An unexpected error occurred"])
      );
    }
  };

  const createBook = async (book) => {
    try {
      const res = await createBookRequest(book);
      await getBooks();
      return res.data;
    } catch (error) {
      setErrors(error.response?.data || [error.message]);
      throw error;
    }
  };

  const updateBook = async (book) => {
    try {
      const res = await updateBookRequest(book);
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b._id === res.data._id ? res.data : b))
      );
      return res.data;
    } catch (error) {
      setErrors(error.response?.data || [error.message]);
      throw error;
    }
  };

  const deleteBook = async (id) => {
    try {
      await deleteBookRequest(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      setErrors(error.response?.data || [error.message]);
      throw error;
    }
  };

  // Cargar los libros al montar el componente
  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        errors,
        getBooks,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
