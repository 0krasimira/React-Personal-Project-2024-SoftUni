import { Route, Routes } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';
import Home from './components/home/Home';
import AboutUs from './components/about/AboutUs';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className="main-content"> {/* Wrap routes here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/about-us" element={<AboutUs />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
