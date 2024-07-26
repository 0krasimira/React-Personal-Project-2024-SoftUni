const Contact = require('../models/Contact')

exports.submitQuery = async (fullName, email, message) => {
    // Validate the input
    if (!fullName || !email || !message) {
        throw new Error('All fields are required.');
    }

    // Create a new contact query
    const newQuery = new Contact({ fullName, email, message });
    await newQuery.save();

    return newQuery;
}

exports.getAllQueries = () => Contact.find()