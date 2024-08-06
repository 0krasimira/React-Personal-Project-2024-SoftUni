const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Your email address should be at least 10 characters. Please, try again.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, "Your password should be at least 6 characters. Please, enter a valid password."]
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, 
        minLength: [6, "Your username should be at least 6 characters in length."]
    },
    destinations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Destination'
    }],

    likedDestinations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Destination'
    }]
});

userSchema.pre('save', async function(next) {
    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ email: this.email }, { username: this.username }] });
    if (existingUser) {
        const field = existingUser.email === this.email ? 'email' : 'username';
        this.invalidate(field, `${field} is already taken.`);
        return next(new Error(`${field} is already taken.`));
    }

    // Hash the password before saving
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

userSchema.virtual('repeatPassword')
    .get(function() {
        return this._repeatPassword;
    })
    .set(function(value) {
        this._repeatPassword = value;
    });

userSchema.pre('validate', function(next) {
    if (this.password !== this._repeatPassword) {
        this.invalidate('repeatPassword', 'The passwords should match.');
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;