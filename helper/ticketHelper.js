const pool = require("../model/index");

const ticketHelper = {
  async createTable() {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'active', 'complete', 'reject')),
        assignee VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      );
    `);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
  async createTicket(title, description, status, assignee) {
    try {
      const result = await pool.query(
        "INSERT INTO tickets(title, description,status,assignee) VALUES($1, $2,$3,$4)",
        [title, description, status, assignee]
      );
      return !!result.rowCount;
    } catch (err) {
      throw new Error(err);
    }
  },
  async fetchTickets() {
    try {
      const result = await pool.query("SELECT * FROM tickets");
      return result.rows;
    } catch (err) {
      throw new Error(err);
    }
  },
  async fetchTicketById(ticketId) {
    try {
      const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [
        ticketId,
      ]);
      // if(!result) throw new Error('invalid Id')
      return result.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateTicketAssignee(newAssignee, ticketId) {
    try {
      const result = await pool.query(
        "UPDATE tickets SET assignee = $1 WHERE id = $2 RETURNING *",
        [newAssignee, ticketId]
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateTicketStatus(newStatus, ticketId) {
    try {
      const result = await pool.query(
        "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
        [newStatus, ticketId]
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
  async addComment(newComment, ticketId) {
    try {
      const result = await pool.query(
        "UPDATE tickets SET comments = array_prepend($1, comments) WHERE id = $2 RETURNING *",
        [newComment, ticketId]
      );

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = ticketHelper;
