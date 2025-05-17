const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "userAuth",
  user: "postgres",
  password: "postgres",
  max: 30,
};
const db = pgp(cn);
module.exports = db;
