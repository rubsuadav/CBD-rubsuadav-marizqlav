export const anonymousGuard = (req, res, next) => {
  if (req.headers.authorization)
    return res.status(403).json({ message: "You are already logged in" });
  next();
};
