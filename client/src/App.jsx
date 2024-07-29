import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext'; // Import AuthProvider and useAuth
import NavBar from './components/nav-bar/NavBar';
import Home from './components/home/Home';
import AboutUs from './components/about/AboutUs';
import ContactUs from './components/contact/ContactUs'; // Assuming you have this component
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AddDestination from './components/add-destination/AddDestination';
import DestinationsList from './components/destinations-list/DestinationsList';
import DestinationDetails from './components/destinations-details/DestinationsDetails';
import MostPopularDestinations from './components/most-popular-destinations/MostPopularDestinations';
import EditDestination from './edit-destination/EditDestination';
// import Profile from './components/profile/Profile'; // Uncomment if you have this component
// import Logout from './components/logout/Logout'; // Uncomment if you have this component

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
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact-us" element={<ContactUs />} /> {/* Added ContactUs route */}
                        <Route path="/add-destination" element={<AddDestination />} />
                        <Route path="/all-destinations" element={<DestinationsList />} /> {/* Added DestinationsPage route */}
                        <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
                        <Route path="/destinations/:destinationId/edit" element={<EditDestination />} />
                        <Route path="/most-popular" element={<MostPopularDestinations />} />
                        
                        {/* Uncomment these lines if you have these components */}
                        {/* <Route path="/profile" element={<PrivateRoute element={<Profile />} />} /> */}
                        {/* <Route path="/logout" element={<PrivateRoute element={<Logout />} />} /> */}
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