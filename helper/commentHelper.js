const pool = require("../model/index");

const commentHelper = {
  async addComment(ticketId,comment) {
    try {
      const result = await pool.query(
        "INSERT INTO comments(ticket_id,comment) VALUES($1,$2)",
        [ticketId,comment]
      );

      return !!result.rowCount;
    } catch (error) {
      throw new Error(error);
    }
  },
  async fetchComments(){
    try {
        const result = await pool.query("SELECT * FROM comments ORDER BY created_at DESC LIMIT 5");
        return result.rows;
      } catch (err) {
        throw new Error(err);
      }
  },
  async fetchCommentsById(ticketId){
    try {
        const result = await pool.query("SELECT * FROM comments WHERE ticket_id = $1", [
          ticketId,
        ]);
        return result.rows;
      } catch (err) {
        throw new Error(err);
      }
  }
};

module.exports=commentHelper