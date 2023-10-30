const SessionRead = require('../models/read/SessionRead');

async function getSessionById(sessionId) {
    return SessionRead.findById(sessionId);
}

module.exports = { getSessionById };
