const jwt = require("../lib/jwt")
const { SECRET } = require("../config/config")
const User = require("../models/User")
// const User = require("../models/User")
// const sitesManager = require('../managers/sitesManager')


exports.auth = async (req, res, next) => {
    // get token
    const token = req.cookies["token"]
    
    if(!token){
        return next()
    }

    // validate token
try{
    const decodedToken = await jwt.verify(token, SECRET)
    req.user = decodedToken 
    res.locals.isAuthenticated = true
    res.locals.user = decodedToken
    next()
}catch{
    res.clearCookie("token");

}
    
}



exports.isAuth = async (req, res, next) => {
    try {
        // Extract token from Authorization header if present
        const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
        // console.log('token', token)
        if (!token) {
            throw new Error('Token not provided');
        }

        // Verify token
        const decoded = await jwt.verify(token, SECRET);
        const userId = decoded._id; // Extract user ID from decoded token

        // Find the user in the database
        const user = await User.findById(userId);
        // console.log('user', user)
        if (!user) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = user;
        // console.log(user)
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};




exports.isGuest = (req, res, next) => {
    if (req.user) {
       return res.redirect('/')
    }

    next()
}

// exports.isOwner = async (req, res, next) => {
//     const site = await sitesManager.getOne()

//     next()
// }