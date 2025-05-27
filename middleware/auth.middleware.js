const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "secretkeyappearshere";

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded
    next();
  } catch (err) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};
