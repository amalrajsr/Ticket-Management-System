const pool = require("../model/index");

const historyHelper = {
  async fechHistory(ticketId) {
    try {
      const result = await pool.query(
        "SELECT * FROM ticket_history WHERE ticket_id = $1 ORDER BY changed_at DESC",
        [ticketId]
      );

      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  },
  async addHistory(ticketId,comment){
    try {
        const result = await pool.query(
          "INSERT INTO ticket_history(ticket_id,comments) VALUES($1,$2)",
          [ticketId,comment]
        );
        return !!result.rowCount;
      } catch (error) {
        throw new Error(error);
      }
  }
};

module.exports=historyHelper