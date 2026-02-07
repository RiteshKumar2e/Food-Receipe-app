import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChefHat, Heart, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <ChefHat size={32} className="logo-icon" />
                    <span>Gourmet Haven</span>
                </Link>

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
                    <Link to="/search" className="nav-link">Explore</Link>
                    <button className="nav-profile">
                        <User size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
