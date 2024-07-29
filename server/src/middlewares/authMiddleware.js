const jwt = require("../lib/jwt")
const { SECRET } = require("../config/config")
const User = require("../models/User")
const destinationManager = require('../managers/destinationManager');
const Destination = require("../models/Destination");


exports.auth = async (req, res, next) => {
    const token = req.cookies["token"] || req.headers.authorization?.split(' ')[1]; // Check both cookies and headers

    if (!token) {
        return next(); // Proceed without user information if no token
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken; // Attach decoded user info
        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;
        next();
    } catch (error) {
        res.clearCookie("token"); // Clear invalid token
        next(); // Proceed to next middleware or route handler
    }
};



exports.isAuth = async (req, res, next) => {
    try {
        // Extract token from Authorization header if present
        const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: 'Token not provided' });
        }

        // Verify token
        const decoded = await jwt.verify(token, SECRET);
        const userId = decoded._id; // Extract user ID from decoded token

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'User not found' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        res.status(401).json({ error: 'Unauthorized' });
    }
};



exports.isGuest = (req, res, next) => {
    if (req.user) {
       return res.redirect('/')
    }

    next()
}

exports.isOwner = async (req, res, next) => {
    try {
        const destinationId = req.params.destinationId;
        const destination = await Destination.findById(destinationId);

        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        if (destination.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Forbidden: You are not the owner of this destination' });
        }

        next();
    } catch (error) {
        console.error('Owner check error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};