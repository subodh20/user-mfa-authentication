const refreshService = require("../services/refreshService");
const {
  signedAuthToken,
  verifyRefreshKey,
  signedRefreshToken,
} = require("../utils/auth-middleware");
module.exports = {
  refreshController: async (req, res) => {
    const oldRefToken = req.cookies.refreshToken;
    const { username } = req.body;
    if (!oldRefToken) {
      return res.status(401).json({ message: "No Refresh token provided" });
    }
    const isExpired = req.cookies.isExpired;
    if (isExpired) {
      return res
        .status(401)
        .json({ message: "Refresh token expired, please login again" });
    }
    const isVerified = verifyRefreshKey(oldRefToken);
    if (!isVerified) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token, please login again" });
    }
    const accessToken = signedAuthToken({ username });
    const newRefreshToken = signedRefreshToken({ username });
    if (!accessToken) {
      return res.status(400).json({ message: "Error generating access token" });
    }
    if (!newRefreshToken) {
      return res
        .status(400)
        .json({ message: "Error generating refresh token" });
    }

    const result = await refreshService.refreshService(
      oldRefToken,
      newRefreshToken
    );
    if (result.error) {
      return res.status(500).json({ message: result.error });
    }
    return res.status(200).json({ message: "Refresh token is created" });
  },
};
