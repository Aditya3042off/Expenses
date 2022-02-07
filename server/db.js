const mongoose = require("mongoose");

//Expense Schema

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: Date
});

const Expense = mongoose.model("Expense", expenseSchema);


//User schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  expenseList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expense"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = { Expense, User };