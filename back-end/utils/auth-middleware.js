const SECRET_KEY = process.env.SECRET_KEY || "1234";
const jwt = require("jsonwebtoken");
const signedAuthToken = (user) => {
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
};
const verifyAuthToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
