const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {

  const token = req.cookies?.token; // Ensure cookies exist
  if (!token) {
    console.log("Token not found");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id; // Assuming the payload has `id`
    console.log("user is verified successfully");
    next(); // Proceed to the next middleware/route
  } catch (e) {
    console.log("Invalid token:", e.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

module.exports = verifyToken;
