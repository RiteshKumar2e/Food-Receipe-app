import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Utensils, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');
    const [featured, setFeatured] = React.useState([]);

    React.useEffect(() => {
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
            <section className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-content">
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Master the Art of <span>Gourmet Cooking</span>
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Explore 5000+ premium recipes from around the globe.
                    </motion.p>

                    <motion.form
                        className="hero-search"
                        onSubmit={handleSearch}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <input
                            type="text"
                            placeholder="What do you want to cook today?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Search Recipes</button>
                    </motion.form>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <Utensils size={24} />
                            <span>5k+ Recipes</span>
                        </div>
                        <div className="stat-item">
                            <Award size={24} />
                            <span>Top Chefs</span>
                        </div>
                        <div className="stat-item">
                            <Clock size={24} />
                            <span>Quick Meals</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured-section">
                <div className="section-header">
                    <h2>Chef's Special</h2>
                    <p>Inspiring dishes to elevate your culinary journey</p>
                </div>

                <div className="recipes-grid">
                    {featured.map((recipe, index) => (
                        <motion.div
                            key={recipe.idMeal}
                            className="recipe-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                        >
                            <div className="recipe-image-wrapper">
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                                <div className="recipe-badge">{recipe.strCategory}</div>
                            </div>
                            <div className="recipe-content">
                                <h3 className="recipe-title">{recipe.strMeal}</h3>
                                <div className="recipe-meta">
                                    <span>{recipe.strArea}</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>View Recipe</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style jsx>{`
        .hero-search {
          display: flex;
          max-width: 700px;
          margin: 0 auto 3rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 0.5rem;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-search input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 1rem 2rem;
          color: white;
          font-size: 1.1rem;
        }

        .hero-search input:focus {
          outline: none;
        }

        .hero-search button {
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 100px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-search button:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 111, 97, 0.4);
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-top: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
        }

        .stat-item span {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-main);
        }

        .section-header {
          text-align: center;
          padding: 4rem 2rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
};

export default Home;
