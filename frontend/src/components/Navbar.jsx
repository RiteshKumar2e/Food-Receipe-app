import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ChefHat, User, Globe, ChevronDown, UserPlus, LogIn, LayoutDashboard, Menu, X } from 'lucide-react';
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

    // If on Landing Page, show the special Landing Navbar layout (No Search)
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

    // App / Dashboard / Search / Recipe Navbar (Has Search)
    return (
        <nav className="navbar app-nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <ChefHat size={32} className="logo-icon" />
                    <span>Gourmet Haven</span>
                </Link>

                <div className="nav-menu">
                    <div className="country-dropdown-wrapper">
                        <button className="nav-link dropdown-toggle" onClick={() => setShowCountry(!showCountry)}>
                            <Globe size={18} />
                            Cuisines
                            <ChevronDown size={14} />
                        </button>
                        {showCountry && (
                            <div className="country-dropdown">
                                {countries.map(c => (
                                    <button key={c.code} onClick={() => handleCountryClick(c.code)}>
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <form className="nav-search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">
                        <Search size={20} />
                    </button>
                </form>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    {token ? (
                        <>
                            <Link to="/dashboard" className="nav-link">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <Link to="/profile" className="nav-profile">
                                {user?.name?.[0] || 'U'}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link login-link">
                                <LogIn size={18} /> Login
                            </Link>
                            <Link to="/register" className="nav-link register-btn">
                                <UserPlus size={18} /> Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
