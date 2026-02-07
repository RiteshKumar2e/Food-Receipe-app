import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Utensils, Award, Clock, ArrowRight, Star, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=a');
                const data = await response.json();
                setFeatured(data.meals?.slice(0, 4) || []);
            } catch (error) {
                console.error("Error fetching featured:", error);
            }
        };
        fetchFeatured();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className="home-page">
            <section className="hero-landing">
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="premium-tag"
                        >
                            <Star size={16} fill="var(--primary)" />
                            <span>Premium Culinary Experience</span>
                        </motion.div>

                        <motion.h1
                            className="hero-display"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            A Good Meal Leads to <br /> <span>Good Mood</span>
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Embrace the symphony of tastes on your plate with our curated collection of international delicacies.
                        </motion.p>

                        <motion.form
                            className="landing-search-box"
                            onSubmit={handleSearch}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="input-group">
                                <Search className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search for a Dish Name Here..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <button type="submit">Search Recipe</button>
                        </motion.form>

                        <motion.div
                            className="hero-features"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="feat">
                                <TrendingUp size={20} />
                                <span>Trending Now</span>
                            </div>
                            <div className="feat">
                                <Heart size={20} />
                                <span>Heart Healthy</span>
                            </div>
                            <div className="feat">
                                <Clock size={20} />
                                <span>Under 30 Mins</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="featured-grid-section">
                <div className="container-padding">
                    <div className="section-header-left">
                        <div>
                            <span className="section-subtitle">Recommended for You</span>
                            <h2>Chef's Special Selection</h2>
                        </div>
                        <button className="view-all-btn" onClick={() => navigate('/search')}>
                            Explore All <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="recipes-grid">
                        {featured.map((recipe, index) => (
                            <motion.div
                                key={recipe.idMeal}
                                className="premium-recipe-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                            >
                                <div className="card-img-container">
                                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                    <div className="category-pill">{recipe.strCategory}</div>
                                    <button className="like-btn" onClick={(e) => { e.stopPropagation(); }}>
                                        <Heart size={18} />
                                    </button>
                                </div>
                                <div className="card-details">
                                    <h3>{recipe.strMeal}</h3>
                                    <div className="card-footer">
                                        <div className="origin">
                                            <Globe size={14} />
                                            <span>{recipe.strArea}</span>
                                        </div>
                                        <span className="view-link">Recipe &rarr;</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const Globe = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

export default Home;
