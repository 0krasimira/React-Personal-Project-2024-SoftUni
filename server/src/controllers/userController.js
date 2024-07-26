const router = require("express").Router()
const userManager = require('../managers/userManager')
const { isGuest, isAuth } = require('../middlewares/authMiddleware')
// const Painting = require("../models/Painting")



router.get('/register', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - register' });
});


router.post('/register', isGuest, async (req, res) => {
    try {
        const user = await userManager.register(req.body);
        res.json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extract and send specific validation error messages
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({ errors });
        } else {
            // Custom error handling for specific errors
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
        console.log('Received credentials:', { username, password }); // Add this line
        
        const { token, username: loggedInUsername } = await userManager.login(username, password);
        res.json({ token, username: loggedInUsername });
    } catch (error) {
        console.error('Error logging user:', error.message); // Ensure you log the error message
        res.status(401).json({ error: 'Invalid username or password' });
    }
});



router.get('/logout', isAuth, (req, res) => {
     res.status(200).clearCookie('token').send();
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('Requested user ID:', userId);
    try {
        const currentUser = await userManager.getOneUser(userId)
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(currentUser);
    } catch (error) {
        console.error('Error fetching one user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router