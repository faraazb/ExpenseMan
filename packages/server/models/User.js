const { Sequelize, DataTypes } = require('sequelize');
const currencies  = require("../currencies.json");

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        defaultCurrency: {
            type: DataTypes.ENUM(Object.keys(currencies))
        }
    }, {
        tableName: "users",
        underscored: true,
        timestamps: true,
    });
}