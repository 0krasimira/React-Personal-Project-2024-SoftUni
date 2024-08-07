import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './Contacts.module.css';

function ContactUs() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!form.fullName) newErrors.fullName = 'All fields are required';
        if (!form.email) {
            newErrors.email = 'All fields are required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!form.message) newErrors.message = 'All fields are required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3000/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form) // Stringify the form data
                });
                if (response.ok) {
                    setSuccessMessage('Thank you for submitting your query. Our team will get back to you via email within the next 3 working days.');
                    setForm({ fullName: '', email: '', message: '' });
                    setErrors({});
                } else {
                    setSuccessMessage('An error occurred. Please try again later.');
                }
            } catch (error) {
                console.log('Error', error.message);
                setSuccessMessage('An error occurred. Please try again later.');
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>Contact Us</header>
            <div className={styles.leftSection}>
                <div className={styles.contactInfo}>
                    <FaMapMarkerAlt className={styles.icon} />
                    <span>Burgas, bl.23, et.8, Bulgaria</span>
                </div>
                <div className={styles.contactInfo}>
                    <FaPhone className={styles.icon} />
                    <span>+359 886 577 972</span>
                </div>
                <div className={styles.contactInfo}>
                    <FaEnvelope className={styles.icon} />
                    <span>krasimirast95@gmail.com</span>
                </div>
            </div>
            <div className={styles.rightSection}>
                <h2>Send us a message</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.formLabel} htmlFor="fullName">Full Name:</label>
                        <div className={styles.inputArea}>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && <span className={styles.errorIcon}>!</span>}
                        </div>
                        {errors.fullName && <small className={styles.errorTxt}>{errors.fullName}</small>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.formLabel} htmlFor="email">Email:</label>
                        <div className={styles.inputArea}>
                            <input
                                type="text" // Changed from "email" to "text" to avoid browser validation
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className={styles.errorIcon}>!</span>}
                        </div>
                        {errors.email && <small className={styles.errorTxt}>{errors.email}</small>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.formLabel} htmlFor="message">Message:</label>
                        <div className={styles.inputArea}>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className={styles.formInput}
                                rows="4"
                                placeholder="Type your message"
                            />
                        </div>
                        {errors.message && <small className={styles.errorTxt}>{errors.message}</small>}
                    </div>
                    <input type="submit" value="Submit" className={styles.formButton} />
                </form>
                {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            </div>
        </div>
    );
}

export default ContactUs;
