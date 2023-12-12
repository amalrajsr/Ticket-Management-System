const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function connectToDatabase() {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

module.exports = connectToDatabase;
