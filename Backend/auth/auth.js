const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

function encryptPassword(password) {
  const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey);
  return encryptedPassword.toString();
}

function decryptPassword(encryptedPassword) {
  const password = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return password.toString(CryptoJS.enc.Utf8);
}

function comparePassword(password, encryptedPassword) {
  const decryptedPassword = decryptPassword(encryptedPassword, secretKey);
  if (password === decryptedPassword) return true;
  return false;
}

function sendToken(id, email) {
  const token = jwt.sign({ id, email }, secretKey, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
}

function verifyToken(req, res, next) {
  let token = req.headers.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.id = decoded.id;
    req.email = decoded.email;
    next();
  } catch (e) {
    console.log("Invalid token:", e.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

module.exports = {
  encryptPassword,
  decryptPassword,
  comparePassword,
  sendToken,
  verifyToken,
};
