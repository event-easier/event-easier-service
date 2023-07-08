import jwt from "jsonwebtoken";

export const checkLogin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized due to blank" });
  }
  try {
    const checkToken = token.split(" ")[1];
    console.log(checkToken)
    const decoded = jwt.verify(checkToken, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ message: "Unauthorized due to wrong token" });
    
  }
};