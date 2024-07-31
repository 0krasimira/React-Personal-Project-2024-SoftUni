import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; // Import the CSS Module
import { useAuth } from '../../contexts/authContext'; // Import useAuth from context

export default function NavBar() {
    const { token, username, userId, logout } = useAuth(); // Use context to get authentication state
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        // Optionally, redirect to home or login page
    };

    return (
        <header className={styles.siteNavbar} role="banner">
            <div className="container">
                <nav className={styles.siteNavigation}>
                    <div className={styles.logoContainer}>
                        <img
                            src="https://ih1.redbubble.net/image.1062386321.0697/st,small,507x507-pad,600x600,f8f8f8.jpg"
                            alt="Logo"
                            className={styles.logo}
                        />
                        <h1 className={styles.siteLogo}>
                            <Link to="/">ArchaeoConnect</Link>
                        </h1>
                    </div>
                    <div className={styles.siteMenuToggle} onClick={handleToggle}>
                        <span className={styles.iconMenu}></span>
                        <span className={styles.iconMenu}></span>
                        <span className={styles.iconMenu}></span>
                    </div>
                    <ul className={`${styles.siteMenu} ${menuOpen ? styles.siteMenuActive : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        {token ? (
                            <>
                                <li className={styles.hasChildren}>
                                    <Link to="/all-destinations">Archaeological Sites</Link>
                                    <ul className={styles.dropdown}>
                                        <li><Link to="/add-destination">
                                            <i className="fas fa-plus"></i> Add a Destination
                                        </Link></li>
                                        <li><Link to="/all-destinations">
                                            <i className="fas fa-glasses"></i> Browse All Destinations
                                        </Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/contact-us">Contact Us</Link></li>
                                <li><Link to="/about-us">About Us</Link></li>
                                <li className={styles.hasChildren}>
                                    <Link to={`/auth/${userId}`}> Hello, <span className={styles.username}>{username}</span></Link>
                                    <ul className={styles.dropdown}>
                                        <li><Link to={`/auth/${userId}`}>My Profile</Link></li>
                                        <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/auth/login">Login</Link></li>
                                <li><Link to="/auth/register">Register</Link></li>
                                <li className={styles.hasChildren}>
                                    <Link to="/all-destinations">Archaeological Sites</Link>
                                    <ul className={styles.dropdown}>
                                        <li><Link to="/all-destinations">
                                            <i className="fas fa-glasses"></i> Browse All Destinations
                                        </Link></li>
                                        <li><Link to="/search-sites">
                                            <i className="fas fa-search"></i> Search Sites
                                        </Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/contact-us">Contact Us</Link></li>
                                <li><Link to="/about-us">About Us</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

