import axiosInstance from "./axios";

export const getBooksRequest = () => axiosInstance.get("/books");

export const getBookRequest = (id) => axiosInstance.get(`/books/${id}`);

export const createBookRequest = (book) => axiosInstance.post("/books", book);

export const updateBookRequest = (book) =>
  axiosInstance.put(`/books/${book._id}`, book);

export const deleteBookRequest = (id) => axiosInstance.delete(`/books/${id}`);
