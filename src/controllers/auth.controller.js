import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    //Entra un hash y se encripta
    const passwordHash = await bcrypt.hash(password, 10);

    //Se crea un nuevo usuario
    const newUser = new User({
      fullname,
      username,
      email,
      password: passwordHash,
      role: "reader", //Si no se envía, se asigna el valor por defecto
    });

    //Se guarda el usuario
    const userSaved = await newUser.save();

    const token = await createAccesToken({
      id: userSaved._id,
      role: userSaved.role,
    }); //Incluye el rol en el token
    res.cookie("token", token);

    //Devuelve el usuario registrado
    res.json({
      id: userSaved.id,
      fullname: userSaved.fullname,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccesToken({
      id: userFound._id,
      role: userFound.role,
    }); //Incluye el rol en el token

    res.cookie("token", token);

    //Devuelve el usuario registrado
    res.json({
      id: userFound.id,
      fullname: userFound.fullname,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      creartedAd: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    fullname: userFound.fullname,
    username: userFound.username,
    email: userFound,
    email,
    role: userFound.role,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

//Ruta para verificar que el usuario siga autenticado en la página
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(400).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
