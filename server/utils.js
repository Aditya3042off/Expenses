
//handles all the errors from async functions. catches the errors and sends them to error handler
const asyncHandler = (fn) => {
  return function(req,res,next) {
    fn(req,res,next).catch(error=> next(error));
  }
}



module.exports = {asyncHandler};