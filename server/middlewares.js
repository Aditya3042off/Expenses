const jwt = require("jsonwebtoken");
const { CustomError } = require("./errorClass");
const { User } = require("./db");

//verifies if the token sent by the user is valid or not
const protect = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  //verifying the token
  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err) throw new CustomError("Access Denied", 403);

    //getting user details from DB
    User.findById(result.id, (err, user) => {
      if (err) throw new CustomError("User Not Found", 404);

      req.user = user;
      return next();
    }).select("-password").populate("expenseList");
  });
};

//custom error handler
const customErrorHandler = (err, req, res, next) => {
  const { message, type } = err;
  const status = err.status || 500;
  res.status(status).json({ type, message });
};

module.exports = { protect, customErrorHandler };