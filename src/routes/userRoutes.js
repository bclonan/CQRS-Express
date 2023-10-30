const express = require('express');
const router = express.Router();
const { createUser } = require('../commands/userCommands');
const { getUserById } = require('../queries/userQueries');

router.post('/', async (req, res) => {
    try {
        await createUser(req.body);
        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
