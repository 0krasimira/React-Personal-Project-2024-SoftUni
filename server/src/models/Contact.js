
const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: [true, 'All fields are mandatory'],
    },
    email: {
        type: String, 
        required: [true, 'All fields are mandatory'],
    },
    message: {
        type: String, 
        required: [true, 'All fields are mandatory'],
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
    
})


const Contact = mongoose.model("Contact", contactSchema)


module.exports = Contact
