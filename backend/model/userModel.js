const mongoose = require("mongoose")

const userSchemaRules = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    // isAdmin: {
    //     type: Boolean,
    //     required: false,
    //     default: false
    // }
    role: {
        type: String,
        required: true,
        default: "User"
    },
    otp: {
        type: Number,
        default: null
    }
}

const userSchema = new mongoose.Schema(userSchemaRules)

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel