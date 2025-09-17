const mongoose = require("mongoose")

const UsersSchema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
});

const User = mongoose.model("User",UsersSchema);
module.exports = User;