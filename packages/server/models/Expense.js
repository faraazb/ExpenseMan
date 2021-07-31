const { Sequelize, DataTypes } = require('sequelize');
const currencies  = require("../currencies.json");

module.exports = (sequelize) => {
    sequelize.define('Expense', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        amount: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false,
            defaultValue: 0,
        },
        currency: {
            type: DataTypes.ENUM(Object.keys(currencies)),
            allowNull: false
        },
        incurredAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        currency_symbol: {
            type: DataTypes.VIRTUAL,
            get() {
                return currencies[`${this.currency}`]["symbol_native"];
            },
            set(value) {
                throw new Error(`Do not set currency_symbol explicitly. 
                                    Check currencies.json`)
            }
        },
        currency_decimal_digits: {
            type: DataTypes.VIRTUAL,
            get() {
                return currencies[`${this.currency}`]["decimal_digits"];
            },
            set(value) {
                throw new Error(`Cannot set currency_decimal_digits 
                                    explicitly. Check currencies.json`)
            }
        }
    }, {
        tableName: "expenses",
        underscored: true,
        timestamps: true
    });
}