import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice compuesto para evitar duplicados
favoriteSchema.index({ user: 1, book: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
