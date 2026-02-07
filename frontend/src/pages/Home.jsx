import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Utensils, Award, Clock, ArrowRight, Star, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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

            <style jsx>{`
                .hero-landing {
                    height: 100vh;
                    width: 100%;
                    position: relative;
                    background-image: url('/src/assets/food.jpg');
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), var(--bg-main)),
                                rgba(255, 255, 255, 0.2);
                    z-index: 1;
                }

                .hero-container {
                    position: relative;
                    z-index: 2;
                    max-width: 1200px;
                    width: 100%;
                    padding: 0 2rem;
                    text-align: center;
                }

                .premium-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 111, 97, 0.08);
                    border: 1px solid var(--primary);
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    color: var(--primary);
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .hero-display {
                    font-size: 5rem;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                    color: var(--text-main);
                }

                .hero-display span {
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-description {
                    font-size: 1.25rem;
                    color: var(--text-muted);
                    max-width: 700px;
                    margin: 0 auto 3.5rem;
                    line-height: 1.6;
                }

                .landing-search-box {
                    background: white;
                    padding: 0.75rem;
                    border-radius: 100px;
                    display: flex;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                    border: 1px solid var(--glass-border);
                    box-shadow: var(--shadow-md);
                }

                .input-group {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding-left: 1.5rem;
                }

                .search-icon {
                    color: var(--text-muted);
                    margin-right: 1rem;
                }

                .landing-search-box input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: var(--text-main);
                    font-size: 1.1rem;
                    padding: 0.5rem 0;
                }

                .landing-search-box input:focus {
                    outline: none;
                }

                .landing-search-box button {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 1rem 3rem;
                    border-radius: 100px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .landing-search-box button:hover {
                    background: var(--primary-hover);
                    transform: scale(1.02);
                    box-shadow: 0 8px 20px rgba(255, 111, 97, 0.3);
                }

                .hero-features {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    color: var(--text-muted);
                }

                .feat {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .featured-grid-section {
                    padding: 8rem 0;
                    background: var(--bg-main);
                }

                .container-padding {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .section-header-left {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 4rem;
                }

                .section-subtitle {
                    color: var(--primary);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .section-header-left h2 {
                    font-size: 2.5rem;
                    color: var(--text-main);
                }

                .view-all-btn {
                    background: white;
                    border: 1px solid var(--glass-border);
                    color: var(--text-main);
                    padding: 0.8rem 1.8rem;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    box-shadow: var(--shadow-sm);
                }

                .view-all-btn:hover {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: white;
                }

                .premium-recipe-card {
                    background: white;
                    border: 1px solid var(--glass-border);
                    border-radius: 2rem;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: var(--shadow-sm);
                }

                .premium-recipe-card:hover {
                    transform: translateY(-12px);
                    border-color: var(--primary);
                    box-shadow: var(--shadow-md);
                }

                .card-img-container {
                    position: relative;
                    height: 280px;
                    overflow: hidden;
                }

                .card-img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .premium-recipe-card:hover .card-img-container img {
                    transform: scale(1.08);
                }

                .category-pill {
                    position: absolute;
                    top: 1.5rem;
                    left: 1.5rem;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--primary);
                    box-shadow: var(--shadow-sm);
                }

                .like-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: white;
                    border: 1px solid var(--glass-border);
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow-sm);
                }

                .like-btn:hover {
                    background: var(--primary);
                    color: white;
                    transform: scale(1.1);
                    border-color: var(--primary);
                }

                .card-details {
                    padding: 2rem;
                }

                .card-details h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--text-main);
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .origin {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }

                .view-link {
                    color: var(--primary);
                    font-weight: 700;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .hero-display { font-size: 3rem; }
                    .landing-search-box { 
                        flex-direction: column; 
                        border-radius: 30px; 
                        padding: 1rem;
                    }
                    .landing-search-box button { width: 100%; margin-top: 1rem; }
                    .hero-features { display: none; }
                }
            `}</style>
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
