import bcrypt from "bcrypt";
import DB from "../db/index.js";
import jwt from "jsonwebtoken";

const User = DB.user;

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const bcryptPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: bcryptPassword });
    const token = jwt.sign(
      { id: newUser.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Login successful", token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
