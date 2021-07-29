const {User} = require("./User");
const { Expense } = require("./Expense");
const { ExpenseCategory } = require("./ExpenseCategory");

module.exports = function(mongoose) {
    var models = {
        User: User,
        Expense: Expense,
        ExpenseCategory: ExpenseCategory
    }
    return models;
}