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


// app.get("/sessions", async (req, res) => {
//   try {
//     const query = "SELECT * FROM sessions ORDER BY id";
//     const result = await pool.query(query);
//     const sessions = result.rows;
//     res.status(200).json(sessions);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "fetching sessions" });
//   }
// });

//get everything from sessions table with the name of the volunteer
app.get("/sessions", async (req, res) => {
  try {
    const query = `
      SELECT
        sessions.id AS session_id,
        sessions.Date,
        sessions.Time,
        volunteers.Name AS volunteer_name
      FROM
        sessions
      JOIN
        volunteers
      ON
        sessions.Volunteers_id = volunteers.id order by session_id;
    `;

    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "An error occurred while fetching sessions" });
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


//create new volunteer

app.post("/volunteers", (req, res) => {
  let newName = req.body.name;
  let newPhone = req.body.phone;
  let newEmail = req.body.email;

  if (!newName) {
    res.status(400).send("Name field is missing");
  } else if (!newPhone) {
    res.status(400).send("Phone field is missing");
  } else if (!newEmail) {
    res.status(400).send("Email field is missing");
  } else {
    const query = `
      INSERT INTO volunteers (Name, Phone, Email)
      VALUES ($1, $2, $3)
    `;

    pool.query(query, [newName, newPhone, newEmail])
      .then(() => {
        res.status(200).send("New volunteer created");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Error creating a new volunteer");
      });
  }
});


app.post("/volunteers-and-sessions", async (req, res) => {
  const {
    name,
    phone,
    email,
    date,
    time
  } = req.body;

  if (!name || !phone || !email || !date || !time) {
    res.status(400).send("Incomplete data provided");
    return;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Insert the new volunteer into the "volunteers" table
    const volunteerInsertQuery = `
      INSERT INTO volunteers (Name, Phone, Email)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const volunteerValues = [name, phone, email];
    const volunteerResult = await client.query(volunteerInsertQuery, volunteerValues);
    const volunteerId = volunteerResult.rows[0].id;

    // Insert the new session into the "sessions" table
    const sessionInsertQuery = `
      INSERT INTO sessions (Date, Time, Volunteers_id)
      VALUES ($1, $2, $3);
    `;

    const sessionValues = [date, time, volunteerId];
    await client.query(sessionInsertQuery, sessionValues);

    await client.query("COMMIT");
    res.status(201).send("New volunteer and session created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating volunteer and session:", err);
    res.status(500).send("An error occurred while creating volunteer and session");
  } finally {
    client.release();
  }
});







app.listen(port, () => console.log(`Listening on port ${port}`));
