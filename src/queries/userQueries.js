const UserRead = require('../models/read/UserRead');

async function getUserById(userId) {
    return UserRead.findById(userId);
}

module.exports = { getUserById };
