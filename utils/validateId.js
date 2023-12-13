const AppError = require("./error");
const asyncHandler = require("express-async-handler");

const validateID = () => {
  return asyncHandler(async (req, res, next) => {
   if(!req.params.id || !+req.params.id) throw new AppError(400,'Invalid Id')
   next()
  });
};

module.exports=validateID
