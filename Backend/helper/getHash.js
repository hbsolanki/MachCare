const bcrypt = require('bcrypt');
async function getHashPassword(password) {
  const saltRounds = process.env.SALT_ROUNDS || 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error in generating hashed password:", err);
    return;
  }
}

module.exports = getHashPassword;