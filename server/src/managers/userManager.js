const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');
// const Site = require('../models/Site')

exports.register = async (userData) => {
  const email = await User.findOne({ email: userData.email });
  if (email) {
      const error = new Error("Email already exists");
      error.name = 'DuplicateEmailError';
      throw error;
  }

  const username = await User.findOne({ username: userData.username });
  if (username) {
      const error = new Error("Username is already taken");
      error.name = 'DuplicateUsernameError';
      throw error;
  }

  return User.create(userData);
};


exports.login = async (username, password) => {
  // Get user from db
  const user = await User.findOne({ username });

  // Check if user exists
  if (!user) {
      throw new Error('Cannot find username or password');
  }

  // Check if password is valid
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
      throw new Error('Cannot find username or password');
  }

  // Generate jwt token
  const payload = {
      _id: user._id,
      username: user.username,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });

  // Return token and username
  return { token, 
    username: user.username, 
    userId: user._id };
}


exports.checkUsernameAvailability = async (username) => {
    try {
      const user = await User.findOne({ username });
      return !user; // Return true if username is available, false if it's already taken
    } catch (error) {
      console.error('Error checking username availability:', error);
      throw new Error('Internal server error');
    }
  };

  exports.checkEmailAvailability = async (email) => {
    try {
      const user = await User.findOne({ email });
      return !user; // Return true if username is available, false if it's already taken
    } catch (error) {
      console.error('Error checking email availability:', error);
      throw new Error('Internal server error');
    }
  };

  exports.getOneUser = async (userId) => {
    try {
        // Populate the destinations and likedDestinations fields with all necessary data
        const user = await User.findById(userId)
            .populate({
                path: 'destinations',
                select: 'name location yearOfDiscovery imageUrl prevInvestigations likes author', // Select necessary fields
                populate: {
                    path: 'author',
                    select: 'username' // Populate author with username
                }
            })
            .populate({
                path: 'likedDestinations',
                select: 'name location yearOfDiscovery imageUrl prevInvestigations likes author', // Select necessary fields
                populate: {
                    path: 'author',
                    select: 'username' // Populate author with username
                }
            })
            .lean(); // Convert the mongoose document to a plain JavaScript object

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user data');
    }
};
