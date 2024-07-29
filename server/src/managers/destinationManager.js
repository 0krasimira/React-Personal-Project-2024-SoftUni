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


exports.getAll = () => {
  return Destination.find().populate('author', 'username');
}


exports.getOne = (destinationId) => Destination.findById(destinationId).populate('author', 'username').populate('comments.author', 'username');


exports.edit = (destinationId, destinationData) => Site.findByIdAndUpdate(destinationId, destinationData, { runValidators: true })

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
