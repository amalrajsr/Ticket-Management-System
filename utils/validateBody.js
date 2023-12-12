const AppError = require("./error");
const asyncHandler = require("express-async-handler");

const validateBody = (schema) => {
  return asyncHandler(async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body);
      next();
    } catch (err) {
      throw new AppError(400, err.errors[0]);
    }
  });
};

module.exports=validateBody
