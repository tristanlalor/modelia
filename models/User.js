const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: Array,
        default: []
    }
}, {collection: 'users'});

const User = mongoose.model('User', UserSchema);

module.exports = User;