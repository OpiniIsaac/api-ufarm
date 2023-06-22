// routes/records.js

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const connectionConfig = require("../config/database");

// Create a record
router.post("/", async (req, res) => {
  try {
    const { name, title } = req.body;
    const connection = await mysql.createConnection(connectionConfig);

    const createQuery = "INSERT INTO employee (name, title) VALUES (?, ?)";
    await connection.query(createQuery, [name, title]);

    connection.end();

    return res.status(200).json({ message: "Record created" });
  } catch (error) {
    console.error("Error creating record:", error);
    return res.status(500).json({ error: "Failed to create record" });
  }
});

// Get all records
router.get("/",async (req, res) => {
  try {
    const connection = mysql.createConnection(connectionConfig);

    connection.connect();

    const readQuery = "SELECT * FROM employee";
    connection.query(readQuery, (error, results) => {
      if (error) {
        console.error("Error reading records:", error);
        return res.status(500).json({ error: "Failed to fetch records" });
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
  const { title } = req.body;

  try {
    const connection = mysql.createConnection(connectionConfig);

    connection.connect();

    const updateQuery = "UPDATE employee SET title = ? WHERE id = ?";
    connection.query(updateQuery, [title, id], (error, result) => {
      if (error) {
        console.error("Error updating record:", error);
        return res.status(500).json({ error: "Failed to update record" });
      }

      connection.end();

      return res.status(200).json({ message: "Record updated" });
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

    const deleteQuery = "DELETE FROM employee WHERE id = ?";
    connection.query(deleteQuery, id, (error, result) => {
      if (error) {
        console.error("Error deleting record:", error);
        return res.status(500).json({ error: "Failed to delete record" });
      }

      connection.end();

      return res.status(200).json({ message: "Record deleted" });
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(500).json({ error: "Failed to connect to database" });
  }
});

module.exports = router;
