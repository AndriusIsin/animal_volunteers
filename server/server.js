const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
app.get("/sessions", async (req, res) => {
  try {
    const query = "SELECT * FROM sessions ORDER BY id";
    const result = await pool.query(query);
    const sessions = result.rows;
    res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching sessions" });
  }
});
app.get("/volunteers", async (req, res) => {
  try {
    const query = "SELECT * FROM volunteers ORDER BY id";
    const result = await pool.query(query);
    const volunteers = result.rows;
    res.status(200).json(volunteers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching volunteers" });
  }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
