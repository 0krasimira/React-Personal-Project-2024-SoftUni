import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext'; // Import AuthProvider and useAuth
import NavBar from './components/nav-bar/NavBar';
import Home from './components/home/Home';
import AboutUs from './components/about/AboutUs';
import ContactUs from './components/contact/ContactUs';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AddDestination from './components/add-destination/AddDestination';
import DestinationsList from './components/destinations-list/DestinationsList';
import DestinationDetails from './components/destinations-details/DestinationsDetails';
import MostPopularDestinations from './components/most-popular-destinations/MostPopularDestinations';
import EditDestination from './edit-destination/EditDestination';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/protection/Protection';
import NotFound from './components/not-found/NotFound';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <NavBarWithAuth />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/:userId" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>

                        } />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/add-destination" element={
                            <ProtectedRoute>
                                <AddDestination />
                            </ProtectedRoute>


                        } />
                        <Route path="/all-destinations" element={<DestinationsList />} />
                        <Route path="/destinations/:destinationId" element={<DestinationDetails />} />


                        <Route path="/destinations/:destinationId/edit" element={
                            <ProtectedRoute>
                                <EditDestination />
                            </ProtectedRoute>


                        } />

                        <Route path="/destinations/:destinationId/delete" element={
                            <ProtectedRoute>
                                <DestinationDetails />
                            </ProtectedRoute>


                        } />

                        <Route path="/most-popular" element={<MostPopularDestinations />} />
                        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
}

function NavBarWithAuth() {
    const { token, username, logout } = useAuth();
    return <NavBar isLoggedIn={!!token} username={username} logout={logout} />;
}


export default App;
