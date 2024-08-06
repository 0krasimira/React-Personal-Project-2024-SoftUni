const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Comment cannot be empty']
    },
    profilePhoto: String, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Comment = mongoose.model("Comment", commentSchema)


module.exports = {Comment, commentSchema};