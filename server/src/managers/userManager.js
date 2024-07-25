const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');
// const Site = require('../models/Site')

exports.register = async (userData) => {


   const email = await User.findOne({email: userData.email}) 

   if(email){
    throw new Error("Email already exists")
   }

    const username = await User.findOne({username: userData.username}) 
   
   if(username){
    throw new Error("Username is already taken")
   }

   return User.create(userData)
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
  return { token, username: user.username };
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

exports.getOneUser = (userId) => User.findById(userId) // .populate('sites') // TO ADD: POPULATE("SITES)