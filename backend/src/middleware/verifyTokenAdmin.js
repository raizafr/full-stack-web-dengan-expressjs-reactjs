import jwt from "jsonwebtoken";

const verifyTokenAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.adminId = decoded.adminId;
    next();
  });
};

export default verifyTokenAdmin;
