const pool = require("../model/index");

const ticketHelper = {
  async createTable() {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(255) NOT NULL CHECK (status IN ('pending', 'active', 'success', 'reject')),
        assignee VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        comments JSONB[]
      );
    `);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
  async createTicket(title, description, status, assignee) {
    try {
      const res = await pool.query(
        "INSERT INTO tickets(title, description,status,assignee) VALUES($1, $2,$3,$4)",
        [title, description, status, assignee]
      );
      return !!res.rowCount;
    } catch (err) {
      throw new Error(err);
    }
  },
  async fetchTickets() {
    try {
      const result = await pool.query("SELECT * FROM tickets");
      return result.rows
    } catch (err) {
      throw new Error(err);
    }
  },
  
};

module.exports = ticketHelper;
