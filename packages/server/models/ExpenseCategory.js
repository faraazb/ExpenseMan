var mongoose = require("mongoose");
const { expenseCategorySchema } = require("./schemasODM/expenseCategorySchema");

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

exports.ExpenseCategory = ExpenseCategory
