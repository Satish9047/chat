const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    username: {
        type: String,
        require: true,
        min: 4,
        max:20,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        min:8
    },
    img: {
        type: String,
        default: "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg"
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;