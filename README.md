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

# Screenshots
![Screenshot 2024-08-07 153214](https://github.com/user-attachments/assets/e33ac87f-6e61-4d0d-b100-6f02e10cff65)
![Screenshot 2024-08-07 154135](https://github.com/user-attachments/assets/8d5f4f1b-579e-4830-be20-add567629c5a)
![Screenshot 2024-08-07 153919](https://github.com/user-attachments/assets/33e43d71-8b4a-4bc1-a63c-b8291f317a72)
![Screenshot 2024-08-07 153900](https://github.com/user-attachments/assets/cf27b8a8-c373-438d-a2b2-ee3eccc96334)
![Screenshot 2024-08-07 153801](https://github.com/user-attachments/assets/d770692f-1592-4a47-9982-53a38f8d383a)
![Screenshot 2024-08-07 153747](https://github.com/user-attachments/assets/c3ae14a0-1b1a-4f80-b6ab-b8ffe2d2d0c8)
![Screenshot 2024-08-07 153715](https://github.com/user-attachments/assets/32dab931-5fdc-4798-80bb-9d1c31320c10)
![Screenshot 2024-08-07 153652](https://github.com/user-attachments/assets/6866baa0-f0e4-410c-8e46-145b5574d7ed)
![Screenshot 2024-08-07 153640](https://github.com/user-attachments/assets/e80206d7-bbfd-4f66-8fce-b463a242b4a7)
![Screenshot 2024-08-07 153448](https://github.com/user-attachments/assets/2afe57a2-98ea-4510-9158-c6660fedbca7)
![Screenshot 2024-08-07 153435](https://github.com/user-attachments/assets/c8e07606-2e3a-4a81-9637-ed87addd584c)
![Screenshot 2024-08-07 153353](https://github.com/user-attachments/assets/f25a1c55-9931-4718-b3b5-1f38b53d7cc6)
![Screenshot 2024-08-07 153331](https://github.com/user-attachments/assets/dce6ce0e-d400-41ec-a661-638496e3a32f)
![Screenshot 2024-08-07 153312](https://github.com/user-attachments/assets/b9357754-1b29-487d-a902-07834f7551de)


# Acknowledgments
React for the frontend framework.
Node.js and Express for the backend framework.
MongoDB for the database.
bcrypt for password hashing.

