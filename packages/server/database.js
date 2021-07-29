var mongoose = require("mongoose");

/**
 * Connecting with Mongoose
 */
function connectMongoDB() {
    mongoose
    .connect("mongodb://localhost:27017/MoneySHA", {
        auth: {
            username: "faraaz",
            password: "winterfell"
        },
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.info("Connected to MongoDB")
        return 1
    })

    mongoose.connection.on('error', () => {
        console.error("Error occurred with MongoDB connection!");
    });
    return 0
}

module.exports.connectMongoDB = connectMongoDB;
