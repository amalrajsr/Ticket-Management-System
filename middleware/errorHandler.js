const AppError = require("../utils/error");
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ error: { success: false, message: err.message } });
  } else {
    res
      .status(500)
      .json({ error: { success: false, message: "something went wrong" } });
  }
};

module.exports = errorHandler;
