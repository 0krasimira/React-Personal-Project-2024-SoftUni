import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext'; // Import AuthProvider and useAuth
import NavBar from './components/nav-bar/NavBar';
import Home from './components/home/Home';
import AboutUs from './components/about/AboutUs';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
// import Profile from './components/profile/Profile'; // Assuming you have these components
// import Logout from './components/logout/Logout'; // Assuming you have this component

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <NavBarWithAuth /> {/* Use NavBarWithAuth */}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                        {/* <Route path="/profile" element={<Profile />} />
                        <Route path="/logout" element={<Logout />} /> */}
                        <Route path="/about-us" element={<AboutUs />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
}

function NavBarWithAuth() {
    const { token, username, logout } = useAuth(); // Use context to get authentication state

    return <NavBar isLoggedIn={!!token} username={username} logout={logout} />;
}

export default App;
