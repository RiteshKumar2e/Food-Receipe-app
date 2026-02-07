import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, LogOut, Heart, BookOpen } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };

    if (!user) return <div className="dashboard-page"><div className="dashboard-container"><h2>Please login to view dashboard</h2></div></div>;

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div className="welcome-msg">
                        <h1>Hi, {user.name}! 👋</h1>
                        <p>Welcome to your personal culinary dashboard.</p>
                    </div>
                    <button className="view-all-btn" style={{ background: '#ff6f61', color: 'white', borderColor: '#ff6f61' }} onClick={logout}>
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                <section className="search-widget">
                    <h3>Search something special today</h3>
                    <form className="dashboard-search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find a recipe (e.g., Pasta, Biryani...)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </section>

                <div className="dashboard-grid">
                    <div className="recent-searches">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <BookOpen size={24} color="var(--primary)" />
                            <h3 style={{ margin: 0 }}>Recent Activity</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>You haven't searched for any recipes recently. Try searching for something above!</p>
                    </div>

                    <div className="profile-mini-column">
                        <div className="profile-card-mini">
                            <div className="pfp-placeholder">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="profile-details-mini">
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: '800' }}>0</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Favorites</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: '800' }}>0</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Searches</div>
                                    </div>
                                </div>
                                <Link to="/profile" className="view-profile-btn">
                                    My Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
