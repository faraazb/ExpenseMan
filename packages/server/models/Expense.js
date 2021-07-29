var mongoose = require("mongoose");
const { expenseSchema } = require("./schemasODM/expenseSchema");

const Expense = mongoose.model('Expense', expenseSchema);

exports.Expense = Expense;
