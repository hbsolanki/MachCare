const bcrypt = require('bcrypt');
async function comparePassword(password, hashPassword) {
    try {
      return (await bcrypt.compare(password, hashPassword)) ? true : false;
    } catch (error) {
      console.error("error in comparing password ", error);
    }
}

module.exports = comparePassword;