import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, LogOut, Heart, BookOpen, Clock, Flame, Star, ChevronRight, Utensils, Coffee, Pizza, Soup } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const cuisines = [
        {
            name: 'Indian',
            image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=300&fit=crop',
            color: '#ff6f61'
        },
        {
            name: 'Chinese',
            image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
            color: '#4caf50'
        },
        {
            name: 'Italian',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop',
            color: '#ffa000'
        },
    ];

    const collections = [
        { title: "Best of Indian Spice", count: "100+ Recipes", image: "https://images.unsplash.com/photo-1545231027-63b6f0a77ad1?w=800&q=80" },
        { title: "Authentic Chinese Wok", count: "80+ Recipes", image: "https://images.unsplash.com/photo-1512003867696-6d5ce11b7740?w=800&q=80" },
        { title: "Classic Italian Pastas", count: "60+ Recipes", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80" },
        { title: "North Indian Delights", count: "40+ Recipes", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80" },
    ];

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
                {/* Hero Header */}
                <header className="dashboard-header-modern">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="welcome-text-v2"
                    >
                        <h1>Focusing on your favorites, {user.name.split(' ')[0]}</h1>
                        <p>Explore the best of Indian, Chinese, and Italian cuisines.</p>
                    </motion.div>
                </header>

                {/* Main Search Bar */}
                <div className="main-search-container">
                    <form className="modern-search-bar" onSubmit={handleSearch}>
                        <Search size={22} className="search-icon-fixed" />
                        <input
                            type="text"
                            placeholder="Search for 'Biryani', 'Noodles' or 'Pizza'..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>

                {/* Quick Cuisines - Zomato Style Circles */}
                <section className="categories-section">
                    <div className="section-header">
                        <h2>Inspiration for your next order</h2>
                    </div>
                    <div className="cuisines-circles-grid">
                        {cuisines.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="cuisine-circle-item"
                                onClick={() => navigate(`/search?area=${cat.name}`)}
                            >
                                <div className="circle-image-wrapper">
                                    <img src={cat.image} alt={cat.name} />
                                </div>
                                <span>{cat.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Collections Section */}
                <section className="collections-section">
                    <div className="section-header">
                        <h2>Collections</h2>
                        <Link to="/search" className="view-all-link">All collections <ChevronRight size={16} /></Link>
                    </div>
                    <p className="section-desc">Explore curated lists of the best recipes around you</p>
                    <div className="collections-grid-v2">
                        {collections.map((coll, idx) => (
                            <motion.div
                                key={idx}
                                className="collection-card-v2"
                                style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url(${coll.image})` }}
                                onClick={() => navigate(`/search?q=${coll.title}`)}
                            >
                                <div className="collection-info-v2">
                                    <h4>{coll.title}</h4>
                                    <span>{coll.count} <ChevronRight size={14} /></span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Info Row */}
                <div className="dashboard-info-row">
                    <div className="activity-card-v2">
                        <div className="card-header-v2">
                            <Clock size={20} />
                            <h3>Recent Activity</h3>
                        </div>
                        <div className="activity-empty">
                            <p>You haven't explored any recipes yet. Your culinary journey starts here!</p>
                            <button onClick={() => navigate('/search')}>Explore Now</button>
                        </div>
                    </div>

                    <div className="user-mini-card-v2">
                        <div className="user-card-header">
                            <div className="user-pfp-v2">{user?.name?.[0] || 'U'}</div>
                            <div className="user-meta-v2">
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="user-stats-v2">
                            <div className="stat-item">
                                <strong>0</strong>
                                <span>Favorites</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <strong>0</strong>
                                <span>Searches</span>
                            </div>
                        </div>
                        <Link to="/profile" className="profile-btn-v2">View Full Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
