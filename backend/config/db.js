const mongoose = require("mongoose")
const { DB_URL } = process.env


const connectDB = async () => mongoose.connect(DB_URL).then(() => {
    console.log("Database connection successfully");
}).catch((err) => {
    console.log(err);
    process.exit(1)
})


module.exports = {
    connectDB
}