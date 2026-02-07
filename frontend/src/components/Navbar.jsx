import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ChefHat, User, Globe, ChevronDown, UserPlus, LogIn, LayoutDashboard, Menu, X, Home as HomeIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, token } = useAuth();
    const [query, setQuery] = useState('');
    const [showCountry, setShowCountry] = useState(false);

    const isLandingPage = location.pathname === '/';

    const countries = [
        { name: 'Indian', code: 'Indian' },
        { name: 'Italian', code: 'Italian' },
        { name: 'Chinese', code: 'Chinese' },
        { name: 'Mexican', code: 'Mexican' },
        { name: 'French', code: 'French' },
        { name: 'Japanese', code: 'Japanese' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };

    const handleCountryClick = (code) => {
        navigate(`/search?area=${code}`);
        setShowCountry(false);
    };

    // Landing Page Navbar (Restored to previous version with sections)
    if (isLandingPage) {
        return (
            <nav className="navbar landing-nav">
                <div className="nav-container">
                    <Link to="/" className="nav-logo">
                        <ChefHat size={32} className="logo-icon" />
                        <span>Gourmet Haven</span>
                    </Link>

                    <div className="nav-links landing-links">
                        <a href="#home" className="nav-link">Home</a>
                        <a href="#mission" className="nav-link">Mission</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    <div className="nav-auth">
                        {token ? (
                            <Link to="/dashboard" className="nav-link dashboard-shortcut">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link login-link">Login</Link>
                                <Link to="/register" className="register-btn">Sign In</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        );
    }

    // App / Dashboard / Search / Recipe Navbar (Minimalist version for internal pages)
    return (
        <nav className="navbar app-minimal-nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <ChefHat size={32} className="logo-icon" />
                    <span>Gourmet Haven</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link back-home-btn">
                        <HomeIcon size={18} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
