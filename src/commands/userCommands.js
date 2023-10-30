const UserWrite = require('../models/write/UserWrite');
const UserRead = require('../models/read/UserRead');

async function createUser(userData) {
    const userWrite = new UserWrite(userData);
    await userWrite.save();

    const userRead = new UserRead({
        username: userData.username,
        email: userData.email,
        profile: {
            bio: '',
            avatarUrl: '',
        },
    });
    await userRead.save();
}

module.exports = { createUser };
