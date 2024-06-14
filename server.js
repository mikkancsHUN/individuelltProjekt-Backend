import express from 'express';
import cors from 'cors';
import coffeesRoutes from './routes/coffees.js';
import campaignsRoutes from './routes/campaigns.js';
import authRoutes from './routes/auth.js';
import { adminOnly } from './middlewares/auth.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/coffees', adminOnly, coffeesRoutes);
app.use('/auth', authRoutes);
app.use('/campaigns', adminOnly, campaignsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

// Middleware för felhantering
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});