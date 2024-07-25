import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
                                    <Link to="index.html">ArchaeoConnect</Link>
                                </h1>
                            </div>
                            <ul
                                className={`${styles.siteMenu} ${menuOpen ? styles.siteMenuActive : ''}`}
                            >
                                <li><Link to="/">Home</Link></li>
                                {isLoggedIn ? (
                                    <>
                                        <li className={styles.hasChildren}>
                                            <Link to="profile">Profile</Link>
                                            <ul className={styles.dropdown}>
                                                <li><Link to="myprofile">My Profile</Link></li>
                                                <li><Link to="logout">Logout</Link></li>
                                            </ul>
                                        </li>
                                        <li className={styles.hasChildren}>
                                            <Link to="archaeological-sites">Archaeological Sites</Link>
                                            <ul className={styles.dropdown}>
                                                <li><Link to="add-site">
                                                    <i className="fas fa-plus"></i> Add a Site
                                                </Link></li>
                                                <li><Link to="my-sites"><i className="fas fa-monument"></i> My Sites
                                                </Link></li>
                                                <li><Link to="all-sites">
                                                    <i className="fas fa-glasses"></i> Browse All Sites
                                                </Link></li>
                                                <li><Link to="search-sites">
                                                    <i className="fas fa-search"></i> Search Sites
                                                </Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="contact-us">Contact Us</Link></li>
                                        <li><Link to="about-us">About Us</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="login">Login</Link></li>
                                        <li><Link to="register">Register</Link></li>
                                        <li className={styles.hasChildren}>
                                            <Link to="archaeological-sites">Archaeological Sites</Link>
                                            <ul className={styles.dropdown}>
                                                <li><Link to="all-sites">
                                                    <i className="fas fa-glasses"></i> Browse All Sites
                                                </Link></li>
                                                <li><Link to="search-sites">
                                                    <i className="fas fa-search"></i> Search Sites
                                                </Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="contact-us">Contact Us</Link></li>
                                        <li><Link to="about-us">About Us</Link></li>
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
