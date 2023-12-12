const { query } = require("../model/index");

const tableHelper = {
  async checkTableExists(table) {
    try {
      const result = await query(
        `SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = $1) AS table_exists;`,
        [table]
      );
      return result.rows[0].table_exists;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = tableHelper;
