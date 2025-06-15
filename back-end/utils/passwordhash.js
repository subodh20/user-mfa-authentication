const bcrypt = require("bcrypt");
const saltRound = 10;
module.exports = {
  generateHashedPassword: async (password) => {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  },
  comparePassword: async (userPass, dbPass) => {
    return bcrypt.compare(userPass, dbPass);
  },
};
