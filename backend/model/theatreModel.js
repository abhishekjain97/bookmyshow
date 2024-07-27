const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    owner: {
        // add foreign key from users table
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        default: false
    },
},
// This will add two fields - createdAt and updatedAt ot our collection
{timestamps: true}
)

const Theatre = mongoose.model("theatres", theatreSchema);
module.exports = Theatre