const router = require("express").Router()
const destinationManager = require('../managers/destinationManager')
const { isAuth, auth, isOwner } = require("../middlewares/authMiddleware")
const Destination = require('../models/Destination')
const getErrorMessage = require('../utils/errorUtils')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'),
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
    const destinationData = req.body;
    console.log('destinationData:', destinationData)
    try {
        // Create a new painting document with the author set to the _id of the authenticated user
        const newDestination = await destinationManager.create(req.user._id, destinationData);
        res.json(newDestination);
    } catch (error) {
        console.error('Error creating destination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:destinationId', async (req, res) => {
    const destinationId = req.params.destinationId;
    // console.log('Requested site ID:', siteId);
    try {
        const oneDestination = await destinationManager.getOneWithDetails(destinationId);
      
        if (!oneDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        return res.json(oneDestination);
    } catch (error) {
        console.error('Error fetching one destination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// router.get("/paintings/:paintingId/edit", isAuth, isOwner, async (req, res) => {
//     try {
//         const paintingId = req.params.paintingId
//         console.log('this is the painting im trying to edit', paintingId)
//         const painting = await paintingManager.getOneWithDetails(paintingId)
//         res.status(200).json(painting)
//     } catch (err) {
//         console.error('Error fetching painting:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


// router.post('/paintings/:paintingId/edit', isAuth, isOwner, async (req, res) => {
//     const paintingData = req.body;
//     try {
//         paintingData.author = req.user._id; 
//         const updatedPainting = await paintingManager.edit(req.params.paintingId, paintingData);
//         console.log(updatedPainting)
//         res.status(200).json(updatedPainting);
//     } catch (error) {
//         console.error('Error updating painting:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// router.delete('/paintings/:id/delete', async (req, res) => {
//     try {
//         const paintingId = req.params.id;
//         // Check if the painting exists
//         const painting = await Painting.findById(paintingId);
//         if (!painting) {
//             return res.status(404).json({ error: 'Painting not found' });
//         }
//         await Painting.findByIdAndDelete(paintingId);
//         return res.status(204).send(); // No content
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Server error' });
//     }
// });

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