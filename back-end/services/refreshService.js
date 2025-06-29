const db = require("../dbs/db");
module.exports = {
  refreshService: async (oldRefToken, newRefreshToken) => {
    const query = `UPDATE refresh_tokens SET token = $1 WHERE token = $2`;
    const values = [newRefreshToken, oldRefToken];
    try {
      await db.none(query, values);
      return { message: "Refresh token updated successfully" };
    } catch (e) {
      console.error("Error updating refresh token:", e.message);
      return { error: "Error updating refresh token:" + e.message };
    }
  },
};
