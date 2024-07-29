const router = require("express").Router()
const destinationManager = require('../managers/destinationManager')
const { isAuth, auth, isOwner } = require("../middlewares/authMiddleware")
const Destination = require('../models/Destination')
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
    try {
        const allDestinations = await destinationManager.getAll();
        res.json(allDestinations);
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

router.post('/destinations/:destinationId/comments', async (req, res) => { // it used to be /destinations/:id/comments here
    try {
        const { text } = req.body;
        const commentAuthorId = req.user?._id; // Use req.user if you're setting it in auth middleware

        if (!text || !commentAuthorId) {
            return res.status(400).json({ error: 'Text and authorId are required' });
        }

        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        // Create the new comment
        const newComment = {
            text,
            author: commentAuthorId, // Set author to the userId
            createdAt: new Date()
        };

        // Add the comment to the destination
        destination.comments.push(newComment);
        await destination.save();

        // Optionally, populate comment author details if needed
        const populatedUser = await User.findById(commentAuthorId).select('username');
        
        // Update the comment to include author details
        newComment.author = {
            _id: commentAuthorId,
            username: populatedUser.username
        };

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



// router.get('/search', async (req, res) => {
//     try {
//       // Extract min and max price from request query
//       const { minPrice, maxPrice } = req.query;

//       // Check if minPrice and maxPrice are provided
//       if (!minPrice || !maxPrice) {
//         return res.status(400).json({ message: 'Please provide both minPrice and maxPrice.' });
//       }

//       // Query the database for paintings within the specified price range
//       const paintings = await Painting.find({
//         price: { $gte: minPrice, $lte: maxPrice }
//       });

//       // Return the paintings found
//       res.json(paintings);
//     } catch (error) {
//       console.error('Error searching paintings by price range:', error);
//       res.status(500).json({ message: 'An error occurred while searching paintings.' });
//     }
//   });

//   router.post('/paintings/:paintingId/like', isAuth, async (req, res) => {
//     const paintingId = req.params.paintingId;
//     const userId = req.user.id;
//     try {
//       // Call the likePainting function to like the painting
//       const likedPainting = await paintingManager.likePainting(paintingId, userId);
//       res.status(200).json({ message: 'Painting liked successfully', likedPainting });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

module.exports = router