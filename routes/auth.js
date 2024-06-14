import express from 'express';
import { addUser, authenticateUser } from '../services/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, isAdmin } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const newUser = await addUser({ username, password, isAdmin: isAdmin || false });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await authenticateUser(username, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

export default router;
