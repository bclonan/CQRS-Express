const express = require('express');
const router = express.Router();
const { updateSession } = require('../commands/sessionCommands');
const { getSessionById } = require('../queries/sessionQueries');
const { trackDataChanges } = require('../middleware/trackingMiddleware');

router.use(trackDataChanges());

router.post('/:sessionId', async (req, res) => {
    try {
        await updateSession(req.params.sessionId, req.body);
        res.status(200).send('Session updated');
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/:sessionId', async (req, res) => {
    try {
        const session = await getSessionById(req.params.sessionId);
        if (!session) {
            return res.status(404).send('Session not found');
        }
        res.json(session);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
