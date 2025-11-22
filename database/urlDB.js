require("dotenv").config({ quiet: true });
const mysql = require("mysql2/promise");

async function connectDB() {
  try {
    const urlDB = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // console.log("connected to database");

    const tableQuery = `CREATE TABLE IF NOT EXISTS urlTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    originalUrl VARCHAR(2048) NOT NULL,
    shortId VARCHAR(64) NOT NULL UNIQUE,
    visited INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`;

    await urlDB.execute(tableQuery);

    return urlDB;
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    throw err;
  }
}

// connectDB(); // <-- this actually runs your connection!

module.exports = connectDB;
