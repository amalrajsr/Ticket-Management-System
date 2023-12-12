const { Pool } = require("pg");
const dbConfig = require("../config/dbConfig");

const pool = new Pool(dbConfig);

async function connectToDatabase() {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

const query = async (text, params) => await pool.query(text, params);

module.exports = { connectToDatabase, query };
