const db = require("../dbs/db");
module.exports = {
  registerUser: (userData) => {
    const { username, password, mobile } = userData;
    const query = `INSERT INTO users (username, password, mobile) VALUES ($1, $2, $3)`;
    const values = [username, password, mobile];

    return new Promise((resolve, reject) => {
      db.none(query, values)
        .then(() => {
          resolve({ message: "User registered successfully" });
        })
        .catch((error) => {
          reject({ error: "Error registering user:" + error.message });
        });
    });
  },
  getAllUsers: () => {
    const query = `SELECT * FROM users`;
    return new Promise((resolve, reject) => {
      db.any(query)
        .then((users) => {
          resolve(users);
        })
        .catch((error) => {
          reject({ error: `Error fetching users:${error.message}` });
        });
    });
  },
};
