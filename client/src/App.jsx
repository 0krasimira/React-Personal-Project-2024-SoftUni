import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/home/Home'
import NavBar from './components/nav-bar/NavBar';



function App() {
    return (
        <div className="App">
            <NavBar isLoggedIn={true} /> {/* or false depending on the state */}
            <Home />
        </div>
    );
}

export default App;
