const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { auth } = require("../middlewares/authMiddleware");

function expressConfigurator(app) {
    // Serve static files from the 'public' directory
    app.use(express.static(path.resolve(__dirname, "../public")));

    // Parse URL-encoded bodies
    app.use(express.urlencoded({ extended: false }));

    // Parse cookies
    app.use(cookieParser());

    // Authentication middleware
    app.use(auth);
}

module.exports = expressConfigurator;
