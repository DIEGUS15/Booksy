// import dotenv from "dotenv";
// dotenv.config(); //Carga las variables de entorno

import app from "./app.js";
import { connectDB } from "./db.js";

// app.use();

connectDB();
app.listen(4000);
console.log("Server on port", 4000);
