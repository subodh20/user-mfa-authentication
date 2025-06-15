const db = require("../dbs/db");
module.exports = {
  registerUser: async (userData) => {
    const { username, password, mobile } = userData;
    const query = `INSERT INTO users (username, password, mobile) VALUES ($1, $2, $3)`;
    const values = [username, password, mobile];
    try {
      await db.none(query, values);
      return { message: "User registered successfully" };
    } catch (error) {
      return { error: "Error registering user:" + error.message };
    }
  },
  getAllUsers: async () => {
    const query = `SELECT * FROM users`;
    try {
      return await db.any(query);
    } catch (error) {
      return { error: `Error fetching users: ${error.message}` };
    }
  },
};
