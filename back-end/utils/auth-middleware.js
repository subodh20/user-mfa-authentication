const SECRET_KEY = process.env.SECRET_KEY || "1234";
const REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET_KEY || "1234";
const jwt = require("jsonwebtoken");
const signedAuthToken = (user) => {
  const testAuth = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1m" });
  console.log(testAuth);
  return testAuth;
};
const verifyAuthToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No Access Toke Provided" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "No Valid Token" });
    }
    req.user = user;
    next();
  });
};
const signedRefreshToken = (user) => {
  return jwt.sign({ user }, REFRESH_KEY, { expiresIn: "7d" });
};
const verifyRefreshKey = (token) => {
  return jwt.verify(token, REFRESH_KEY);
};
module.exports = {
  signedAuthToken,
  verifyAuthToken,
  signedRefreshToken,
  verifyRefreshKey,
};
