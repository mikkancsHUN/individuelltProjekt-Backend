import express from 'express';
import { addCampaign } from '../services/campaigns.js';
import { adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', adminOnly, async (req, res) => {
    const { products, price } = req.body;
    if (!products || !price) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newCampaign = await addCampaign({ products, price });
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;

