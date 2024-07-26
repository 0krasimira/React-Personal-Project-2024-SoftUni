import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', username: '', password: '', repeatPassword: '' });

    if (form.password !== form.repeatPassword) {
      setErrors((prev) => ({ ...prev, repeatPassword: "Passwords do not match" }));
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Handle specific errors from backend
          const errorMap = {};
          data.errors.forEach(err => {
            errorMap[err.field] = err.message;
          });
          setErrors(errorMap);
        } else {
          throw new Error(data.error || 'Registration was unsuccessful. Please, try again.');
        }
      } else {
        alert('Registration successful!');
        navigate('/auth/login');
        setForm({ email: '', username: '', password: '', repeatPassword: '' });
      }

    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>Register Here</header>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <div className={styles.inputArea}>
            <i className={`${styles.icon} fas fa-envelope`}></i>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <i className={`${styles.errorIcon} fas fa-exclamation-circle`}></i>}
          </div>
          {errors.email && <div className={styles.errorTxt}>{errors.email}</div>}
        </div>
        <div className={styles.field}>
          <div className={styles.inputArea}>
            <i className={`${styles.icon} fas fa-user`}></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            {errors.username && <i className={`${styles.errorIcon} fas fa-exclamation-circle`}></i>}
          </div>
          {errors.username && <div className={styles.errorTxt}>{errors.username}</div>}
        </div>
        <div className={styles.field}>
          <div className={styles.inputArea}>
            <i className={`${styles.icon} fas fa-lock`}></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && <i className={`${styles.errorIcon} fas fa-exclamation-circle`}></i>}
          </div>
          {errors.password && <div className={styles.errorTxt}>{errors.password}</div>}
        </div>
        <div className={styles.field}>
          <div className={styles.inputArea}>
            <i className={`${styles.icon} fas fa-lock`}></i>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Confirm Password"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />
            {errors.repeatPassword && <i className={`${styles.errorIcon} fas fa-exclamation-circle`}></i>}
          </div>
          {errors.repeatPassword && <div className={styles.errorTxt}>{errors.repeatPassword}</div>}
        </div>
        <input type="submit" value="Register" />
      </form>
      <div className={styles.signTxt}>
        Already a member? <Link to="/auth/login">Login now</Link>
      </div>
    </div>
  );
}
