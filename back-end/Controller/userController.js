const userServices = require("../services/userServices");
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
  registerUser: (req, res) => {
    const { username, password, mobile } = req.body;
    if (!username || !password || !mobile) {
      return res.status(400).json({ message: "Some fields are missing" });
    }
    const userData = {
      username,
      password,
      mobile,
    };
    const result = userServices.registerUser(userData);
    if (result.error) {
      return res.status(500).json({ message: result.error });
    }
    res.status(201).json({
      message: result.message,
    });
  },
};
