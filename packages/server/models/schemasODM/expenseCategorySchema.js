var mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

expenseCategorySchema.set("collection", "expense_categories");

exports.expenseCategorySchema = expenseCategorySchema