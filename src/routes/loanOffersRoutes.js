const express = require('express');
const router = express.Router();
const { addLoanOffer } = require('../commands/loanOfferCommands');
const { getLoanOffers } = require('../queries/loanOfferQueries');

router.post('/:sessionId', async (req, res) => {
    try {
        await addLoanOffer(req.params.sessionId, req.body);
        res.status(200).send('Loan offer added');
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/:sessionId', async (req, res) => {
    try {
        const loanOffers = await getLoanOffers(req.params.sessionId);
        res.json(loanOffers);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
