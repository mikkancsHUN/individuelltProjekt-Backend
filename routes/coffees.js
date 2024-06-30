import { Router } from "express";
import { addCoffee, getAllCoffees, updateCoffee, deleteCoffee } from "../services/coffees.js";

const router = Router();

// GET all coffees
router.get('/', async (req, res) => {
    try {
        const coffees = await getAllCoffees();
        res.status(200).json({ coffees : coffees });
    } catch (error) {
        res.status(500).send('Error retrieving coffees');
    }
});

// Add new coffee
router.post('/', async (req, res) => {
    const { id, title, desc, price } = req.body;
    if (!id || !title || !desc || !price) {
        return res.status(400).json({ error : "All fields are required!"});
    }

    try {
        const newCoffee = await addCoffee({ id, title, desc, price });
        res.status(201).json(newCoffee);
    } catch (error) {
        res.status(500).send('Database error');
    }
});

// Update coffee
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, desc, price } = req.body;
    if (!title || !desc || !price) {
        return res.status(400).json({ error : 'All fields are required'});
    }

    try {
        const numReplaced = await updateCoffee(id, { title, desc, price });
        if (numReplaced === 0) {
            return res.status(404).json({ error : 'Coffee not found'});
        }
        res.send('Coffee updated');
    } catch (error) {
        res.status(500).send('Database error');
    }
});

// Delete coffee
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const numRemoved = await deleteCoffee(id);
        if (numRemoved === 0) {
            return res.status(404).json({ error : 'Coffee not found'});
        }
        res.send('Coffee deleted');
    } catch (error) {
        res.status(500).send('Database error');
    }
});

export default router;