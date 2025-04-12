import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: String,
    },
    genre: {
      type: String,
      enum: [
        "Horror",
        "Comedy",
        "Mystery",
        "Suspense",
        "Drama",
        "Romance",
        "Fantasy",
        "Science fiction",
      ],
      default: "Unknown",
      required: true,
    },
    sypnosis: {
      type: String,
    },
    portada: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
