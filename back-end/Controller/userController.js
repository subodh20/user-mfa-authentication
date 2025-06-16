const userServices = require("../services/userServices");
const passwordhash = require("../utils/passwordhash");
const {
  signedAuthToken,
  signedRefreshToken,
} = require("../utils/auth-middleware");
module.exports = {
  getUser: async (req, res) => {
    const users = await userServices.getAllUsers();
    if (users.error) {
      return res.status(500).json({ message: users.error });
    }
    const userWithoutPass = users.map(({ password, ...rest }) => rest);
    return res.status(200).json({
      message: "Users fetched successfully",
      data: userWithoutPass,
    });
  },
  registerUser: async (req, res) => {
    let { username, password, mobile } = req.body;
    if (!username || !password || !mobile) {
      return res.status(400).json({ message: "Some fields are missing" });
    }
    password = await passwordhash.generateHashedPassword(password);
    const userData = {
      username,
      password,
      mobile,
    };
    const result = await userServices.registerUser(userData);
    console.log(result);
    if (result.error) {
      return res.status(500).json({ message: result.error });
    }
    res.status(201).json({
      message: result.message,
    });
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username or password is missing" });
    }
    const userData = { username };
    const user = await userServices.loginUser(userData);
    if (user.error) {
      return res.status(500).json({ message: user.error });
    }
    if (passwordhash.comparePassword(password, user.password)) {
      const accessToken = signedAuthToken({ user: user.username });
      const refreshToken = signedRefreshToken({ user: user.username });
      if (!accessToken || !refreshToken) {
        return res.status(500).json({ message: "Error generating tokens" });
      }
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        samesite: "Strict",
      });
      return res.status(200).json({
        message: "Login successful",
        data: { username: user.username, mobile: user.mobile },
        Metadata: { accessToken },
      });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  },
};
