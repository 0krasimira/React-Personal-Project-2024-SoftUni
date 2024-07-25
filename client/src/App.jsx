import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/Home'
import NavBar from './components/nav-bar/NavBar';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './components/about/AboutUs';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';



function App() {
    return (
        <div className="App">
            <NavBar />
            
            {/* isLoggedIn={true} /> or false depending on the state */}
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/auth/register" element={<Register />}/>
              <Route path="/about-us" element={<AboutUs />}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
