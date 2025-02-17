const bcrypt = require('bcrypt');
async function comparePassword(password, hashPassword) {
    try {
      const result = await bcrypt.compare(password, hashPassword);
      if(result) return true;
      return false;
    } catch (error) {
      console.error("error in comparing password ", error);
    }
}

module.exports = comparePassword;