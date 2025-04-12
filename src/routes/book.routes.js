import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getBooks,
  getBook,
  getBooksByGenre,
  getSortedBooks,
  getAdvancedBooksList,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import {createBookSchema} from "../schemas/"

const router = Router();

router.get("/books", authRequired, getBooks);
router.get("/books/:id", authRequired, getBook);
router.get("/books/:genre", authRequired, getBooksByGenre);
router.get("/books/search", authRequired, searchBooks);
router.get("/books/sort", authRequired, checkRole(["admin"]), getSortedBooks);
router.get(
  "/books/sort",
  authRequired,
  checkRole(["admin"]),
  getAdvancedBooksList
);
router.post("/books", authRequired, checkRole(["admin"]), createBook);
router.put("/books/:id", authRequired, checkRole(["admin"]), updateBook);
router.delete("/books/:id", authRequired, checkRole(["admin"]), deleteBook);

export default router;
