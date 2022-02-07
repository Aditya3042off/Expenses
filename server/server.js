require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/expensesDB";

mongoose.connect("mongodb://localhost:27017/expensesDB", () => {
  console.log(`connected to DB`);
});

const { protect, customErrorHandler } = require("./middlewares");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//route middlewares
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

app.get("/home", protect, (req, res) => {
  const { user } = req;

  res.status(200).json({ name: user.name, email: user.email, expenseList: user.expenseList });
});

//custom error handling middleware
app.use(customErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is up and running`);
});
