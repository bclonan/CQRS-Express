const SessionWrite = require('../models/write/SessionWrite');
const SessionRead = require('../models/read/SessionRead');

async function updateSession(sessionId, sessionData) {
    let sessionWrite = await SessionWrite.findById(sessionId);
    if (sessionWrite) {
        sessionWrite.data = { ...sessionWrite.data, ...sessionData };
        await sessionWrite.save();
    } else {
        sessionWrite = new SessionWrite({ _id: sessionId, data: sessionData });
        await sessionWrite.save();
    }

    let sessionRead = await SessionRead.findById(sessionId);
    if (sessionRead) {
        sessionRead.data = { ...sessionRead.data, ...sessionData };
        await sessionRead.save();
    } else {
        sessionRead = new SessionRead({ _id: sessionId, data: sessionData });
        await sessionRead.save();
    }
}

module.exports = { updateSession };
