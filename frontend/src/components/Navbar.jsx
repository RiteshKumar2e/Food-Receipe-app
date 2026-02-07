import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChefHat, User, Globe, ChevronDown, UserPlus, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [query, setQuery] = useState('');
    const [showCountry, setShowCountry] = useState(false);

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

    return (
        <nav className="navbar">
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
