// app.js or index.js
const connectionConfig = require('./config/database')
const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;



// Create database and table if they don't exist
async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS testsql');
    await connection.query('USE testsql');

    // Create the table if it doesn't exist
    await connection.query(`CREATE TABLE IF NOT EXISTS employee (
      id INT AUTO_INCREMENT,
      name VARCHAR(255),
      title VARCHAR(255),
      PRIMARY KEY (id)
    )`);

    console.log('Database and table created.');

    connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();

app.use(express.json());

// Routes
const routers = require('./routes/routes ');
app.use('/api/records', routers);

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
