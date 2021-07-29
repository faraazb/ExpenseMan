var mongoose = require("mongoose");

const { connectMongoDB } = require("./database");
// const { User } = require("./models/User");
// const { Expense } = require("./models/Expense");
const { User, Expense, ExpenseCategory } = require("./models/models")(mongoose)
var express = require("express");

const app = express();
const port = 3000;

connectMongoDB();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

// const user = new User({
//   username: "FaraazB"
// });

// user.save((error) => {
//   if (error) console.log(error);
//   else console.log(user);
// });

// const home = new ExpenseCategory({
//   name: "Home"
// });

// home.save((error) => {
//   if (error) console.log(error);
//   else console.log(home);
// });

// const expense = new Expense({
//   user: user._id,
//   amount: 100.00,
//   currency: "IND",
//   incurred_on: Date.now(),
//   category: home._id,
//   description: "Hello world and Home!"
// });

// expense.save((error) => {
//   if (error) console.log(error);
//   else console.log(expense);
// })

// Expense.findOne()
//   .populate("user")
//   .populate("category")
//   .exec((error, expense) => {
//     if (error) console.log(error);
//     else console.log(expense.symbol_native);
// })