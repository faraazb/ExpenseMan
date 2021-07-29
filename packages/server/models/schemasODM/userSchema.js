var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String
    }
});

userSchema.set("collection", "users");

exports.userSchema = userSchema;

