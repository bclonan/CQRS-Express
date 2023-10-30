const mongoose = require('mongoose');

const userReadSchema = new mongoose.Schema({
    username: String,
    email: String,
    profile: {
        bio: String,
        avatarUrl: String,
    },
});

module.exports = mongoose.model('UserRead', userReadSchema);
