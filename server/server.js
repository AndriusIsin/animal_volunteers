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

// get all sessionss
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
        TO_CHAR(sessions.Date, 'DD/MM/YYYY') AS date,
        sessions.Time,
        sessions.volunteers_id,
        volunteers.Name AS volunteer_name
      FROM
        sessions
      JOIN
        volunteers
      ON
        sessions.Volunteers_id = volunteers.id
      ORDER BY session_id;
    `;

    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Unable to connect to the database" })
  }
})

// Update volunteer information and session date and time
app.put("/volunteers/:id", async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const { Name, Phone, Email, Time, Date } = req.body;

    if (isNaN(volunteerId)) {
      return res.status(400).json({ error: "Invalid volunteer ID" });
    }

    const updateVolunteerQuery = `
      UPDATE volunteers
      SET Name = $1, Phone = $2, Email = $3
      WHERE id = $4;
    `;
    const updateVolunteerValues = [Name, Phone, Email, volunteerId];

    await pool.query(updateVolunteerQuery, updateVolunteerValues);

    const updateSessionsQuery = `
      UPDATE sessions
      SET Time = $1, Date=$2
      WHERE volunteers_id = $3;
    `;

    const updateSessionsValues = [Time, Date, volunteerId];

    await pool.query(updateSessionsQuery, updateSessionsValues);

    res.status(200).json({
      message:
        "Volunteer information and assigned sessions updated successfully",
    });
  } catch (error) {
    console.error("Error updating the volunteer and assigned sessions:", error);
    res.status(500).json({
      error:
        "An error occurred while updating the volunteer and assigned sessions",
    });
  }
});

//get all volunteers
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

    pool
      .query(query, [newName, newPhone, newEmail])
      .then(() => {
        res.status(200).send("New volunteer created");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error creating a new volunteer");
      });
  }
});

//to create new volunteer and session in the same time
app.post("/volunteers-and-sessions", async (req, res) => {
  const { name, phone, email, date, time } = req.body;

  if (!name || !phone || !email || !date || !time) {
    res.status(400).send("Incomplete data provided");
    return;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const volunteerInsertQuery = `
      INSERT INTO volunteers (Name, Phone, Email)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const volunteerValues = [name, phone, email];
    const volunteerResult = await client.query(
      volunteerInsertQuery,
      volunteerValues
    );
    const volunteerId = volunteerResult.rows[0].id;

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
    res
      .status(500)
      .send("An error occurred while creating volunteer and session");
  } finally {
    client.release();
  }
});

// Delete a volunteer by ID and their associated sessions
app.delete("/volunteers/:id", async (req, res) => {
  const volunteerId = req.params.id;

  if (isNaN(volunteerId)) {
    return res.status(400).json({ error: "Invalid volunteer ID" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Delete sessions associated with the volunteer
    const deleteSessionsQuery = `
      DELETE FROM sessions
      WHERE volunteers_id = $1;
    `;

    await client.query(deleteSessionsQuery, [volunteerId]);

    // Delete the volunteer from the volunteers table
    const deleteVolunteerQuery = `
      DELETE FROM volunteers
      WHERE id = $1;
    `;

    await client.query(deleteVolunteerQuery, [volunteerId]);

    await client.query("COMMIT");
    res.status(200).json({
      message: "Volunteer and associated sessions deleted successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting volunteer and associated sessions:", error);
    res.status(500).json({
      error:
        "An error occurred while deleting volunteer and associated sessions",
    });
  }
});
// Delete sessions by time (morning or evening) and date

app.delete("/sessions", async (req, res) => {
  const { time, date } = req.body;

  if (!time || !date) {
    return res
      .status(400)
      .json({ error: "Missing time or date in the request body" });
  }

  if (time !== "morning" && time !== "evening") {
    return res.status(400).json({ error: "Invalid time parameter" });
  }

  try {
    await pool.query("BEGIN");

    const deleteSessionsQuery = `
      DELETE FROM sessions
      WHERE TO_CHAR(Date, 'DD/MM/YYYY') = $1 AND Time = $2;
    `;
    await pool.query(deleteSessionsQuery, [date, time]);

    await pool.query("COMMIT");
    res.status(200).json({ message: "Sessions deleted successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting sessions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting sessions" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
