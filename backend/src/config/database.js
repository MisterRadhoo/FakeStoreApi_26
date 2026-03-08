require("colors");
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fakeStoreApi_V2";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000, });
        console.log("Connected to MongoDB...".green.inverse);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;