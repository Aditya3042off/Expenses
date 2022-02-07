const express = require("express");
const router = express.Router();
const { Expense, User } = require("../db");
const { protect } = require("../middlewares");

//POST /expense/save
// PRIVATE ROUTE

router.post("/save", protect, async (req, res) => {
  const id = req.user._id;
  const { title, amount, date } = req.body;

  //getting user details
  const user = await User.findById(id);

  //saving expense to DB
  const expense = new Expense({ title, amount, date });
  const savedExpense = await expense.save();

  //adding expense to user
  user.expenseList.push(savedExpense);

  await user.save();

  //getting saved user with populated expenseList field
  const savedUser = await User.findById(id).select("-password").populate("expenseList");

  res.status(200).json({ name: savedUser.name, email: savedUser.email, expenseList: savedUser.expenseList });
});

module.exports = router;