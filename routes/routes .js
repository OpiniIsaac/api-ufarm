// routes/records.js

const express = require("express");
const router = express.Router();
const mysql = require("mysql");


// Create a record
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'qwerty'
  };

router.post("/", async (req, res) => {
  try {
    const { name, ward,gender } = req.body;
    const connection = await mysql.createConnection(connectionConfig);

    const createQuery = "INSERT INTO farmerOne (name, ward,gender) VALUES (?, ?.?)";
    await connection.query(createQuery, [name, ward,gender]);

    connection.end();

    return res.status(200).json({ message: "Farmer One Registered" });
  } catch (error) {
    console.error("Error creating Farmer One:", error);
    return res.status(500).json({ error: "Failed to create Farmer One" });
  }
});

// Get all records
router.get("/",async (req, res) => {
  try {
    const connection = mysql.createConnection(connectionConfig);

    connection.connect();

    const readQuery = "SELECT * FROM farmerOne";
    connection.query(readQuery, (error, results) => {
      if (error) {
        console.error("Error reading Farmer One:", error);
        return res.status(500).json({ error: "Failed to fetch Farmer One records" });
      }

      connection.end();

      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
}

);
// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const connection = mysql.createConnection(connectionConfig);

    connection.connect();

    const updateQuery = "UPDATE farmerOne SET name = ? WHERE id = ?";
    connection.query(updateQuery, [name, id], (error, result) => {
      if (error) {
        console.error("Error updating farmer one:", error);
        return res.status(500).json({ error: "Failed to update farmer One" });
      }

      connection.end();

      return res.status(200).json({ message: "farmer One updated" });
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = mysql.createConnection(connectionConfig);

    connection.connect();

    const deleteQuery = "DELETE FROM farmerOne WHERE id = ?";
    connection.query(deleteQuery, id, (error, result) => {
      if (error) {
        console.error("Error deleting record:", error);
        return res.status(500).json({ error: "Failed to delete farmer One" });
      }

      connection.end();

      return res.status(200).json({ message: "farmer One deleted" });
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
});



module.exports = router;
