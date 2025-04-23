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

// Agrupar rutas con el mismo prefijo
const booksRouter = Router();

booksRouter.get("/", checkRole(["admin"]), getBooks);
booksRouter.get("/search", searchBooks);
booksRouter.get("/sort", checkRole(["admin"]), getSortedBooks);
booksRouter.get("/advanced", checkRole(["admin"]), getAdvancedBooksList);
booksRouter.get("/:id", getBook);
booksRouter.get("/:genre", getBooksByGenre);
booksRouter.post("/", checkRole(["admin"]), createBook);
booksRouter.put("/:id", checkRole(["admin"]), updateBook);
booksRouter.delete("/:id", checkRole(["admin"]), deleteBook);

// Aplicar middleware de autenticación a todas las rutas de tareas
router.use("/books", authRequired, booksRouter);

export default router;
