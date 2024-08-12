# React-Personal-Project-2024-SoftUni

ArchaeoConnect Responsive Web Application

# Overview
This project is a blog platform designed for archaeology enthusiasts. It provides a space for users to explore and engage with various archaeological destinations through blog posts. Users can manage their profiles, interact with content, and participate in discussions about their favorite destinations.

# Features
User Authentication:
Register and log in to access personalized features.
CRUD Operations:
Create: Write and publish new blog posts.
Read: Browse and search blog posts by keyword.
Update: Edit existing blog posts that you have created.
Delete: Remove blog posts you have authored.
Profile Management:
Create and update your profile, including uploading a profile photo.
Interaction with Destinations:
Like and unlike destinations to show your interest.
Leave comments on blog posts to engage with the community.
Search Functionality:
Find destinations and blog posts by entering relevant keywords.

# Technology Stack
Frontend: React, React Router, FontAwesome CSS Modules
Backend: Node.js, Express, Multer, Mongoose, bcrypt
Development Tools: Nodemon

# Usage
Explore Destinations:
Browse the list of destinations and read detailed blog posts.
Search for Destinations:
Use the search bar to find posts by keyword.
Manage Your Profile:
Upload a profile photo and review your added and liked destinations.
Engage with Content:
Like or unlike destinations and leave comments on posts.
Create and Manage Posts:
Write new blog posts, edit them, or delete those you no longer wish to display.

# API Endpoints

### User

- **Register**
  - `POST /register`
    - **Request Body:** `{ "email": "user@example.com", "username": "username", "password": "yourpassword" }`
  
- **Login**
  - `POST /login`
    - **Request Body:** `{ "username": "username", "password": "yourpassword" }`
  
- **Logout**
  - `GET /logout`

- **Profile**
  - `GET /:userId`
    - **URL Params:** `userId=<userId>`

- **Upload Photo**
  - `POST /:userId/upload-profile-photo`
    - **URL Params:** `userId=<userId>`
    - **Form-data:** `profilePhoto=<file>`

- **Added Destinations**
  - `GET /:userId/added-destinations`
    - **URL Params:** `userId=<userId>`

- **Liked Destinations**
  - `GET /:userId/liked-destinations`
    - **URL Params:** `userId=<userId>`

### Destinations

- **All**
  - `GET /`

- **Paginated & Search**
  - `GET /all-destinations`
    - **Query Params:** `page=<pageNumber>&search=<searchTerm>`

- **Most Popular**
  - `GET /most-popular`

### Contact

- **Get Queries**
  - `GET /contacts`

- **Submit Query**
  - `POST /contacts`
    - **Request Body:** `{ "fullName": "Your Name", "email": "user@example.com", "message": "Your message here" }`


# Acknowledgments
React for the frontend framework.
Node.js and Express for the backend framework.
MongoDB for the database.
bcrypt for password hashing.

