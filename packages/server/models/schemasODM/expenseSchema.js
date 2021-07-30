var currencies = require("server/currencies.json")
var mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Expense Schema
 * 
 * Storing currency ISO codes in the currency field
 */

const expenseSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Schema.Types.Decimal128,
            required: true
        },
        currency: {
            type: String,
            enum: {
                values: Object.keys(currencies),
                message: '{VALUE} is not a valid currency! Please check/update currencies.json'
            },
            required: true
        },
        incurred_on: {
            type: Date,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "ExpenseCategory",
            required: true
        },
        description: {
            type: String
        }
    }, 
    {
        timestamps: {
            createdAt: "created_on",
            updatedAt: "updated_on"
    }
});

expenseSchema.virtual("symbol_native").get(function () {
    return currencies[this.currency]["symbol_native"]
});

expenseSchema.virtual("decimal_digits").get(function () {
    return currencies[this.currency]["decimal_digits"]
});

exports.expenseSchema = expenseSchema;