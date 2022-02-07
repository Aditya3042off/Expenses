require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../db");
const bcrypt = require("bcryptjs");
const { CustomError } = require("../errorClass");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils");



//POST /user/login
// PUBLIC ROUTE

router.post("/login", asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  //checking if user is present in database
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("email is wrong", 401, "EMAIL");

  //checking if the password is correct or not
  const isValid = await bcrypt.compare(password, user.password);  //returns a boolean regarding the passwords match or not
  if (!isValid) throw new CustomError("password is wrong", 401, "PASSWORD");

  //generate token for valid user
  const payload = {
    id: user._id
  };

  const token = jwt.sign(payload,process.env.SECRET_KEY );

  res.status(200).json({ token });

}));


//POST /user/signup
// PUBLIC ROUTE

router.post("/signup", asyncHandler(async (req, res, next) => {

  const { name, email, password } = req.body;
  console.log(name, email, password);

  //checking if the user is already present
  const user = await User.findOne({ email: email });
  if (user) throw new CustomError("User already exists", 400, "EMAIL");

  //hash the password using bcrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //creating user
  const newUser = new User({ name, email, password: hashedPassword, expenseList: [] });
  await newUser.save();
  res.status(200).send("SUCCESS");

}));

module.exports = router;