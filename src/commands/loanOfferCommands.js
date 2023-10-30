const SessionWrite = require('../models/write/SessionWrite');

async function addLoanOffer(sessionId, loanOffer) {
    const session = await SessionWrite.findById(sessionId);
    if (session) {
        session.loanOffers.push(loanOffer);
        await session.save();
    }
}

module.exports = { addLoanOffer };
