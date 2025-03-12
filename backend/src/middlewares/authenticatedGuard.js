import jwt from "jsonwebtoken";

export const authenticatedGuard = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).json({ message: "You must be logged in" });

    const token = jwt.verify(authorization, "secretKey");
    if (!token) return res.status(401).json({ message: "Invalid token" });
    req.userId = token.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
