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

    const categories = [
        { name: 'Biryani', icon: <Flame color="#ff6f61" />, color: '#fff5f4' },
        { name: 'Pizza', icon: <Pizza color="#ffa000" />, color: '#fffaf0' },
        { name: 'Burger', icon: <Utensils color="#4caf50" />, color: '#f1f8f1' },
        { name: 'Pasta', icon: <Soup color="#2196f3" />, color: '#f0f7ff' },
        { name: 'Desserts', icon: <Coffee color="#9c27b0" />, color: '#f9f0ff' },
        { name: 'Healthy', icon: <Star color="#009688" />, color: '#f0f9f8' },
    ];

    const collections = [
        { title: "Trending This Week", count: "40+ Recipes", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
        { title: "Quick 15-Min Meals", count: "25+ Recipes", image: "https://images.unsplash.com/photo-1476824559427-0b8a50a1340b?w=500&q=80" },
        { title: "Healthy Breakfasts", count: "15+ Recipes", image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=500&q=80" },
        { title: "Authentic Indian", count: "100+ Recipes", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
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
                        <h1>Inspiration for your next meal, {user.name.split(' ')[0]}</h1>
                        <p>Discover recipes, plan your week, and cook like a pro.</p>
                    </motion.div>
                </header>

                {/* Main Search Bar */}
                <div className="main-search-container">
                    <form className="modern-search-bar" onSubmit={handleSearch}>
                        <Search size={22} className="search-icon-fixed" />
                        <input
                            type="text"
                            placeholder="Search for 'Pasta', 'Chicken Biryani' or 'Healthy'..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>

                {/* Quick Categories */}
                <section className="categories-section">
                    <div className="section-header">
                        <h2>What's on your mind?</h2>
                    </div>
                    <div className="categories-grid-v2">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="category-item-v2"
                                onClick={() => navigate(`/search?q=${cat.name}`)}
                            >
                                <div className="category-icon-wrapper" style={{ backgroundColor: cat.color }}>
                                    {cat.icon}
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

                {/* Recent & Profile Row */}
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
