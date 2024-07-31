const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const expressConfigurator = require('./config/expressConfigurator');
const router = require('./controllers/destinationController');
const userRouter = require('./controllers/userController');
const contactRouter = require('./controllers/contactController');

const app = express();

// Serve static files from the 'uploads/profile_photos' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ensure the directory exists
const uploadsDir = path.join(__dirname, '../uploads/profile_photos');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware setup
expressConfigurator(app);
app.use(cors());
app.use(bodyParser.json({ extended: true }));

// Use the routers
app.use(router);
app.use(contactRouter);
app.use('/auth', userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/reactProject")
    .then(() => {
        console.log("DB connected successfully.");
        app.listen(3000, () => console.log(`Server is listening on port ${3000}...`));
    })
    .catch(err => console.log("Cannot connect to DB."));
