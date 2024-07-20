import React, { useState } from 'react';
import styles from './NavBar.module.css'; // Import the CSS Module

export default function NavBar({ isLoggedIn }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.siteNavbar} role="banner">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12">
                        <nav className={styles.siteNavigation}>
                            <div className={styles.logoContainer}>
                                <img 
                                    src="https://ih1.redbubble.net/image.1062386321.0697/st,small,507x507-pad,600x600,f8f8f8.jpg" 
                                    alt="Logo" 
                                    className={styles.logo} 
                                />
                                <h1 className={styles.siteLogo}>
                                    <a href="index.html">ArchaeoConnect</a>
                                </h1>
                            </div>
                            <ul 
                                className={`${styles.siteMenu} ${menuOpen ? styles.siteMenuActive : ''}`}
                            >
                                <li><a href="#home">Home</a></li>
                                {isLoggedIn ? (
                                    <>
                                        <li className={styles.hasChildren}>
                                            <a href="#profile">Profile</a>
                                            <ul className={styles.dropdown}>
                                                <li><a href="#myprofile">My Profile</a></li>
                                                <li><a href="#logout">Logout</a></li>
                                            </ul>
                                        </li>
                                        <li className={styles.hasChildren}>
                                            <a href="#archaeological-sites">Archaeological Sites</a>
                                            <ul className={styles.dropdown}>
                                                <li><a href="#add-site">
                                                    <i className="fas fa-plus"></i> Add a Site
                                                </a></li>
                                                <li><a href="#my-sites">My Sites</a></li>
                                                <li><a href="#all-sites">
                                                    <i className="fas fa-glasses"></i> Browse All Sites
                                                </a></li>
                                                <li><a href="#search-sites">
                                                    <i className="fas fa-search"></i> Search Sites
                                                </a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#contact-us">Contact Us</a></li>
                                        <li><a href="#about-us">About Us</a></li>
                                    </>
                                ) : (
                                    <>
                                        <li><a href="#login">Login</a></li>
                                        <li><a href="#register">Register</a></li>
                                        <li className={styles.hasChildren}>
                                            <a href="#archaeological-sites">Archaeological Sites</a>
                                            <ul className={styles.dropdown}>
                                                <li><a href="#all-sites">
                                                    <i className="fas fa-glasses"></i> Browse All Sites
                                                </a></li>
                                                <li><a href="#search-sites">
                                                    <i className="fas fa-search"></i> Search Sites
                                                </a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#contact-us">Contact Us</a></li>
                                        <li><a href="#about-us">About Us</a></li>
                                    </>
                                )}
                            </ul>
                            <div className={styles.siteMenuToggle} onClick={handleToggle}>
                                <span className={styles.iconMenu}></span>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
