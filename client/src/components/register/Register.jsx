import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.css'

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
        throw new Error(data.error || 'Registration failed');
      }

      alert('Registration successful!');
      navigate('/auth/login')
      setForm({ email: '', username: '', password: '', repeatPassword: '' });
      
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>Register Here</header>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="input-area">
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-envelope"></i>
            {errors.email && <i className="error error-icon fas fa-exclamation-circle"></i>}
          </div>
          {errors.email && <div className="error error-txt">{errors.email}</div>}
        </div>
        <div className="field">
          <div className="input-area">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-envelope"></i>
            {errors.email && <i className="error error-icon fas fa-exclamation-circle"></i>}
          </div>
          {errors.email && <div className="error error-txt">{errors.email}</div>}
        </div>
        <div className="field">
          <div className="input-area">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-lock"></i>
            {errors.password && <i className="error error-icon fas fa-exclamation-circle"></i>}
          </div>
          {errors.password && <div className="error error-txt">{errors.password}</div>}
        </div>
        <div className="field">
          <div className="input-area">
            <input
              type="password"
              name="repeatPassword"
              placeholder="Confirm Password"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-lock"></i>
            {errors.repeatPassword && <i className="error error-icon fas fa-exclamation-circle"></i>}
          </div>
          {errors.repeatPassword && <div className="error error-txt">{errors.repeatPassword}</div>}
        </div>
        <input type="submit" value="Register" />
      </form>
      <div className="sign-txt">
        Already a member? <Link to="/login">Login now</Link>
      </div>
    </div>
  );
}