const Destination = require('../models/Destination')
const User = require('../models/User')

exports.create = async (userId, destinationData) => {
    try {
        // Create a new destination document
        const newDestination = new Destination({
            ...destinationData,
            author: userId, // Set the author field to the ObjectId of the authenticated user
        });

        const savedDestination = await newDestination.save();
        await User.findByIdAndUpdate(userId, {$push: {destinations: savedDestination._id}})
        return savedDestination;
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
};


exports.getAll = (skip = 0, limit = 6, searchRegex = null) => {
  // Construct the query object
  const query = searchRegex ? {
    $or: [
      { name: searchRegex },
      { location: searchRegex },
      { prevInvestigations: searchRegex }
    ]
  } : {}; // If no search regex is provided, return all documents

  return Destination.find(query)
    .skip(skip) // Skip the number of documents to `skip` from the beginning of the results; for pagination
    .limit(limit) // limits the number of results per page
    .populate('author', 'username'); // Populate author field with username
};

// Updated countAll method to include search functionality
exports.countAll = (searchRegex = null) => { // searchregex is null by default, if provided, it will filter only the results that include it
  // Construct the query object
  const query = searchRegex ? {
    $or: [
      { name: searchRegex },
      { location: searchRegex },
      { prevInvestigations: searchRegex }
    ]
  } : {}; // If no search regex is provided, count all documents

  return Destination.countDocuments(query); // counts the number of documents in the destination collection that match this query
};


exports.countAll = () => {
  return Destination.countDocuments();
}


exports.getOne = (destinationId) => {
  return Destination.findById(destinationId)
      .populate('author', 'username _id profilePhoto') 
      .populate({
          path: 'comments.author',
          select: 'username _id profilePhoto'
      });
};


exports.edit = (destinationId, destinationData) => Destination.findByIdAndUpdate(destinationId, destinationData, { runValidators: true })

exports.getMostPopularDestinations = async () => {
  try {
    const destinations = await Destination.find().populate('author', 'username');

    // Sort destinations based on likes count and creation date
    const sortedDestinations = destinations.sort((a, b) => {
      const likeDifference = b.likes.length - a.likes.length;
      if (likeDifference !== 0) {
        return likeDifference;
      }
      // If likes are the same, sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Limit to top 3 most popular destinations
    const mostPopularDestinations = sortedDestinations.slice(0, 3);

    return mostPopularDestinations;
  } catch (error) {
    console.error('Error fetching most popular destinations:', error);
    throw error;
  }
};


  
  exports.likeDestination = async (destinationId, userId) => {
    try {
        const destination = await Destination.findById(destinationId);
        if (!destination) {
            throw new Error('Destination not found');
        }

        // Check if the user has already liked the destination
        if (destination.likes.includes(userId)) {
            throw new Error('You have already liked this destination');
        }

        // Add the user's ID to the likes array
        destination.likes.push(userId);
        
        // Update the user document to add the destination to likedDestinations
        await User.findByIdAndUpdate(userId, {
            $addToSet: { likedDestinations: destinationId }
        });

        // Save the updated destination
        await destination.save();
        return destination;
    } catch (error) {
        throw new Error(`Failed to like destination: ${error.message}`);
    }
};

exports.unlikeDestination = async (destinationId, userId) => {
  try {
      // Find the destination by ID
      const destination = await Destination.findById(destinationId);
      if (!destination) {
          throw new Error('Destination not found');
      }

      // Check if the user has liked the destination
      if (!destination.likes.includes(userId)) {
          throw new Error('You have not liked this destination');
      }

      // Remove the user's ID from the likes array
      destination.likes.pull(userId);

      // Update the user's likedDestinations array without loading the full user object
      await User.findByIdAndUpdate(userId, {
          $pull: { likedDestinations: destinationId }
      });

      // Save the updated destination
      await destination.save();

      return destination;
  } catch (error) {
      throw new Error(`Failed to unlike destination: ${error.message}`);
  }
};

  