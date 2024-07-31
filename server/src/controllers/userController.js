const router = require("express").Router();
const userManager = require('../managers/userManager');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

// Registration and Authentication Routes
router.get('/register', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
});

router.post('/register', isGuest, async (req, res) => {
    try {
        const user = await userManager.register(req.body);
        res.json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({ errors });
        } else {
            if (error.message === 'Email already exists') {
                return res.status(400).json({ errors: [{ field: 'email', message: error.message }] });
            } else if (error.message === 'Username is already taken') {
                return res.status(400).json({ errors: [{ field: 'username', message: error.message }] });
            }

            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Something bad happened. Please, try again.' });
        }
    }
});

router.get('/login', isGuest, (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - login' });
});

router.post('/login', isGuest, async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received credentials:', { username, password });
        const { token, username: loggedInUsername, userId } = await userManager.login(username, password);

        res.json({ token, username: loggedInUsername, userId });
    } catch (error) {
        console.error('Error logging user:', error.message);
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.status(200).clearCookie('token').send();
});

// Profile and Destination Management Routes
router.get('/:userId', isAuth, async (req, res) => {
    const userId = req.params.userId;
    console.log('Requested user ID:', userId);
    try {
        const currentUser = await userManager.getOneUser(userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(currentUser);
    } catch (error) {
        console.error('Error fetching one user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// New Route: Fetching Added Destinations
router.get('/:userId/added-destinations', isAuth, async (req, res) => {
    const userId = req.params.userId;
    try {
        const userWithAddedDestinations = await userManager.getOneUser(userId);
        if (!userWithAddedDestinations) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(userWithAddedDestinations.destinations);
    } catch (error) {
        console.error('Error fetching user added destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// New Route: Fetching Liked Destinations
router.get('/:userId/liked-destinations', isAuth, async (req, res) => {
    const userId = req.params.userId;
    try {
        const userWithLikedDestinations = await userManager.getOneUser(userId);
        if (!userWithLikedDestinations) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(userWithLikedDestinations.likedDestinations);
    } catch (error) {
        console.error('Error fetching user liked destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
