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


exports.getAll = (skip = 0, limit = 6) => {
  return Destination.find()
    .skip(skip) // Skip the number of documents specified by `skip`
    .limit(limit) // Limit the number of documents returned to `limit`
    .populate('author', 'username'); // Populate author field with username
};

exports.countAll = () => {
  return Destination.countDocuments();
}

exports.getOne = (destinationId) => Destination.findById(destinationId).populate('author', 'username').populate('comments.author', 'username');


exports.edit = (destinationId, destinationData) => Destination.findByIdAndUpdate(destinationId, destinationData, { runValidators: true })

exports.getMostPopularDestinations = async () => {
    try {
      const mostPopularDestinations = await Destination.find()
        .sort({ likes: -1 }) // Sort by likes in descending order
        .limit(3) // Limit to 3 most popular sites
        .populate('author', 'username'); // Populate author with username field
  
      return mostPopularDestinations;
    } catch (error) {
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

  