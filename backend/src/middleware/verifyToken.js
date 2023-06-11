const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

module.exports = verifyToken;
