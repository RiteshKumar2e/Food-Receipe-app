import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user, data.token);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Connection error. Is the backend running?');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Log in to your Gourmet Haven account.</p>
                </div>

                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email or Phone Number</label>
                        <input
                            name="identifier"
                            type="text"
                            placeholder="Email or +91..."
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="auth-btn">Log In</button>
                </form>

                <div className="auth-footer">
                    Don't have an account?
                    <Link to="/register" className="auth-link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
