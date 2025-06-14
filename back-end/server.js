const express = require("express");
const app = express();
const db = require("./dbs/db");
const userRoute = require("./routes/userRoute");
const port = 3000;
app.get("/health", async (req, res) => {
  try {
    await db.one("SELECT 1");
    res.status(200).send("healthy");
  } catch (e) {
    res.status(500).send("DB connection error:" + e.message);
  }
});
app.use(express.json());
app.use("/api", userRoute);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
