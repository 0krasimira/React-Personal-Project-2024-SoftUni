const router = require("express").Router()
const destinationManager = require('../managers/destinationManager')
const { isAuth, auth, isOwner } = require("../middlewares/authMiddleware")
const Destination = require('../models/Destination')
const Comment = require('../models/Comment')
const User = require("../models/User")
const getErrorMessage = require('../utils/errorUtils')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'),
        res.header('Access-Control-Allow-Methods', '*'),
        res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

    next()
})




router.get('', async (req, res) => {
    try {
        const allDestinations = await destinationManager.getAll()
        res.json(allDestinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all-destinations', async (req, res) => {
    // Extract pagination and search parameters from the query string
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
    const limit = 6; // Set limit to 6 items per page
    const skip = (page - 1) * limit; // Calculate number of items to skip
    const search = req.query.search || ''; // Extract search query parameter

    try {
        // Create a regex pattern for case-insensitive search
        const searchRegex = new RegExp(search, 'i');

        // Fetch destinations with pagination and search filter
        const allDestinations = await destinationManager.getAll(skip, limit, searchRegex);

        // Get total number of destinations for pagination metadata
        const totalDestinations = await destinationManager.countAll(searchRegex);

        // Calculate total number of pages
        const totalPages = Math.ceil(totalDestinations / limit);

        // Send response with destinations and pagination metadata
        res.json({
            destinations: allDestinations,
            totalPages: totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/most-popular', async (req, res) => {
    try {
        const mostPopularDestinations = await destinationManager.getMostPopularDestinations();
        res.json(mostPopularDestinations);
    } catch (error) {
        console.error('Error fetching most popular destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/add-destination', isAuth, async (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - add' });
})



router.post('/add-destination', isAuth, async (req, res) => {
    // Extract painting data from the request body

    try {
        // Create a new painting document with the author set to the _id of the authenticated user
        const destinationData = req.body;
        console.log('destinationData:', destinationData)
        const newDestination = await destinationManager.create(req.user._id, destinationData);
        console.log('newDestination:', newDestination)
        res.json(newDestination);
    } catch (error) {
        console.error('Error creating destination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/destinations/:destinationId', async (req, res) => {
    const destinationId = req.params.destinationId;
    // console.log('Requested site ID:', siteId);
    try {
        const oneDestination = await destinationManager.getOne(destinationId);

        if (!oneDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        return res.json(oneDestination);
    } catch (error) {
        console.error('Error fetching one destination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/destinations/:id/comments', async (req, res) => {
    try {
        const { text } = req.body;
        const commentAuthorId = req.user?._id; // Ensure req.user is set by authentication middleware

        if (!text || !commentAuthorId) {
            return res.status(400).json({ error: 'Text and authorId are required' });
        }

        // Find the destination by ID
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        // Fetch user details including profile photo
        const user = await User.findById(commentAuthorId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Construct the new comment
        const newComment = {
            text,
            author: {
                _id: commentAuthorId,
                username: user.username,
                profilePhoto: user.profilePhoto || '/images/profile_photo.png' // Default to static image if not available
            },
            createdAt: new Date()
        };

        // Add the comment to the destination
        destination.comments.push(newComment);
        await destination.save();

        // Respond with the newly added comment
        res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get("/destinations/:destinationId/edit", isAuth, isOwner, async (req, res) => {
    try {
        const destinationId = req.params.destinationId
        console.log('this is the destination im trying to edit', destinationId)
        const destination = await destinationManager.getOneWithDetails(destinationId)
        res.status(200).json(destination)
    } catch (err) {
        console.error('Error fetching destination:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.post('/destinations/:destinationId/edit', isAuth, isOwner, async (req, res) => {
    const destinationData = req.body;
    try {
        destinationData.author = req.user._id; 
        const updatedDestination = await destinationManager.edit(req.params.destinationId, destinationData);
        console.log(updatedDestination)
        res.status(200).json(updatedDestination);
    } catch (error) {
        console.error('Error updating destination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/destinations/:destinationId/delete', isAuth, isOwner, async (req, res) => {
    try {
        const destinationId = req.params.destinationId; 
        // Check if the destination exists
        const destination = await Destination.findById(destinationId);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        await Destination.findByIdAndDelete(destinationId);
        return res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});




router.post('/destinations/:destinationId/like', isAuth, async (req, res) => {
    console.log('User:', req.user); // Check the user data
    console.log('Destination ID:', req.params.destinationId); // Check the destination ID
    
    const destinationId = req.params.destinationId;
    const userId = req.user.id;
    try {
        const likedDestination = await destinationManager.likeDestination(destinationId, userId);
        res.status(200).json({ message: 'Destination liked successfully', likedDestination });
    } catch (error) {
        console.error('Error liking destination:', error); // Log detailed error
        res.status(400).json({ error: error.message });
    }
});



  router.post('/destinations/:destinationId/unlike', isAuth, async (req, res) => {
    const destinationId = req.params.destinationId;
    const userId = req.user.id;

    try {
        const unlikedDestination = await destinationManager.unlikeDestination(destinationId, userId);
        res.status(200).json({ message: 'Destination unliked successfully', unlikedDestination });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





module.exports = router