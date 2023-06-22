// app.js or index.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'new_password',
  };

// Create database and table if they don't exist
async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS UfarmApi');
    await connection.query('USE UfarmApi');

    // Create the table if it doesn't exist
    await connection.query(`CREATE TABLE IF NOT EXISTS farmerOne (
      id INT AUTO_INCREMENT,
      name VARCHAR(100),
      ward VARCHAR(100),
      gender VARCHAR(100),
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
app.use('/api/ufarm', routers);

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
