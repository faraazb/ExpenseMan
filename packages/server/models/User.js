var mongoose = require("mongoose");
const { userSchema } = require("./schemasODM/userSchema");

const User = mongoose.model("User", userSchema);

exports.User = User;