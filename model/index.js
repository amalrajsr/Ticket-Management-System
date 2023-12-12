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

async function triggers() {
  try {
    // trigger for inserting data to history after status/assingee update
    pool.query(`CREATE OR REPLACE FUNCTION capture_ticket_changes()
    RETURNS TRIGGER AS $$
    BEGIN
    IF NEW.status <> OLD.status THEN
    INSERT INTO ticket_history (ticket_id, status, changed_at)
    VALUES (NEW.id, NEW.status, CURRENT_TIMESTAMP);
  END IF;

  IF NEW.assignee <> OLD.assignee THEN
    INSERT INTO ticket_history (ticket_id, assignee, changed_at)
    VALUES (NEW.id, NEW.assignee, CURRENT_TIMESTAMP);
  END IF;
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`);
  } catch (err) {
    console.log(err);
  }
}

async function createTrigger() {
  try {
    await pool.query(`
     CREATE TRIGGER capture_ticket_changes_after_update
     AFTER UPDATE ON tickets
     FOR EACH ROW
     EXECUTE FUNCTION capture_ticket_changes();
   `);
  } catch (err) {}
}

const query = async (text, params) => { await pool.query(text, params)};
triggers();
createTrigger();
module.exports = { connectToDatabase, query };
