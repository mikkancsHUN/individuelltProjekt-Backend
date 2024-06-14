import { authenticateUser } from '../services/auth.js';

async function adminOnly(req, res, next) {
    const { username } = req.headers;

    if (!username) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const user = await authenticateUser(username);
        if (!user || !user.isAdmin) {
            return res.status(403).send('Admin access required');
        }
        next();
    } catch (error) {
        res.status(500).send('Error checking admin status');
    }
}

export { adminOnly };
