import Book from "../models/book.model.js";

//Get all rooms
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a room by ID
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, year, genre, sypnosis, portada } = req.body;

    const newBook = new Book({
      title,
      author,
      year,
      genre,
      sypnosis,
      portada,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update book
export const updateBook = async (req, res) => {
  try {
    const { title, author, year, genre, sypnosis, portada } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        year,
        genre,
        sypnosis,
        portada,
      },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// export const updateBook = async (req, res) => {
//   try {
//     const updatedBook = await Book.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedBook) {
//       return res.status(404).json({ message: 'Libro no encontrado' });
//     }

//     res.status(200).json(updatedBook);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

//Delete book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(204).json({ message: "Successfully deleted book" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Search for books by title, author or genre
export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ message: "You must provide a search term" });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Filter books by genre
export const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await Book.find({ genre });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener libros ordenados por título o año
export const getSortedBooks = async (req, res) => {
  try {
    const { sortBy, order } = req.query;

    // Validar los parámetros de ordenamiento
    const validSortFields = ["title", "year", "author", "createdAt"];
    const validOrderValues = ["asc", "desc"];

    // Usar valores por defecto si no son válidos
    const field = validSortFields.includes(sortBy) ? sortBy : "title";
    const sortOrder = validOrderValues.includes(order) ? order : "asc";

    // Crear objeto de ordenamiento para MongoDB
    const sortOption = {};
    sortOption[field] = sortOrder === "asc" ? 1 : -1;

    const books = await Book.find().sort(sortOption);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener libros con filtrado, ordenamiento y paginación combinados
export const getAdvancedBooksList = async (req, res) => {
  try {
    // Parámetros de consulta
    const {
      genre, // Filtro por género
      search, // Búsqueda por título o autor
      sortBy, // Campo para ordenar
      order, // Orden (asc/desc)
      page = 1, // Página actual (por defecto 1)
      limit = 10, // Límite por página (por defecto 10)
    } = req.query;

    // Construir filtro
    const filter = {};

    // Agregar filtro por género si existe
    if (genre) {
      filter.genre = genre;
    }

    // Agregar búsqueda por título o autor si existe
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // Validar y configurar ordenamiento
    const validSortFields = ["title", "year", "author", "createdAt"];
    const validOrderValues = ["asc", "desc"];

    const field = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = validOrderValues.includes(order) ? order : "desc";

    const sortOption = {};
    sortOption[field] = sortOrder === "asc" ? 1 : -1;

    // Calcular skip para paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Ejecutar consulta con paginación
    const books = await Book.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Contar total de resultados para la paginación
    const total = await Book.countDocuments(filter);

    res.status(200).json({
      books,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
