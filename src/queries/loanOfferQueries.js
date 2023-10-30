const SessionRead = require('../models/read/SessionRead');

async function getLoanOffers(sessionId) {
    const session = await SessionRead.findById(sessionId);
    if (session) {
        return session.loanOffers;
    }
    return [];
}

module.exports = { getLoanOffers };
