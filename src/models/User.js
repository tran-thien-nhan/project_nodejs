const { Schema, default: mongoose } = require('mongoose');
const userShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: String,
        required: [true, 'phone is required']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    gender: {
        type: String,
        required: [true, 'gender is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
});

const User = mongoose.model("User", userShema);
module.exports = User;