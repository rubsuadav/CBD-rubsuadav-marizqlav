import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// local imports
import { User } from "../models/user.js";
import {
  handleValidationErrors,
  handleValidateUniqueUser,
  validateEmail,
} from "../validators/validate.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (validateEmail(email, res)) return;
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  if (await handleValidateUniqueUser(username, email, res)) return;
  try {
    const user = await User.create({ username, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1d",
    });
    return res.status(201).json({ userId: user._id, token });
  } catch (error) {
    handleValidationErrors(error, res);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!user)
      return res.status(400).json({ message: "Invalid email or username" });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1d",
    });
    return res.status(200).json({ userId: user._id, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
