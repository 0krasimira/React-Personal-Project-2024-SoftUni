const mongoose = require('mongoose');
const {commentSchema} = require('../models/Comment')


const destinationSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'All fields are mandatory'],
        },
        location: {
            type: String,
            required: [true, 'All fields are mandatory'],
        },
        yearOfDiscovery: {
            type: Number,
            required: [true, 'All fields are mandatory'],
        },
        prevInvestigations: {
            type: String,
            required: [true, 'All fields are mandatory'],
        },
        imageUrl: {
            type: String, 
            required: [true, 'All fields are mandatory'],
            match: [/^https?:\/\//, 'Please, enter a valid link']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        likes: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        comments: [commentSchema]
    });


const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;