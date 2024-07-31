import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; // Import useAuth from context
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from context

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        server: '', // New state for server-side errors
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ username: '', password: '', server: '' });

        const newErrors = {};
        if (!form.username) newErrors.username = 'Username is required';
        if (!form.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (!response.ok) {
                // Set server-side error message
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    server: data.error || 'Login failed',
                }));
                return;
            }

            // Destructure token and username from the response
            const { token, username, userId } = data;

            // Use the login function from context
            login(token, username, userId);
            navigate('/');
        } catch (error) {
            console.error('Error:', error.message);
            setErrors((prevErrors) => ({
                ...prevErrors,
                server: 'An unexpected error occurred. Please try again.',
            }));
        }
    };

    return (
        <div className={styles.wrapper}>
            <header>Login Here</header>
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        <i className={`${styles.icon} fas fa-user`}></i>
                        {errors.username && <i className={`${styles.errorIcon} fas fa-exclamation-circle`}></i>}
                    </div>
                    {errors.username && <div className={styles.errorTxt}>{errors.username}</div>}
                </div>
                <div className={styles.field}>
                    <div className={styles.inputArea}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        <i className={`${styles.icon} fas fa-lock`}></i>
                        {errors.password && <i className={`${styles.errorIcon} fas fa-exclamation-circle`}></i>}
                    </div>
                    {errors.password && <div className={styles.errorTxt}>{errors.password}</div>}
                </div>
                {errors.server && <div className={styles.errorTxt}>{errors.server}</div>}
                <input type="submit" value="Login" className={styles.submitButton} />
            </form>
            <div className={styles.signTxt}>
                Not yet a member? <Link to="/auth/register">Signup now</Link>
            </div>
        </div>
    );
}