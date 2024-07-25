import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/Home'
import NavBar from './components/nav-bar/NavBar';
import { Route, Routes } from 'react-router-dom';



function App() {
    return (
        <div className="App">
            <NavBar isLoggedIn={true} /> {/* or false depending on the state */}
            <Routes>
              <Route path="/" element={<Home />}/>
            </Routes>
            
        </div>
    );
}

export default App;
