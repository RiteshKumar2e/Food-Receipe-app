import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Loader2, Star, Clock, Heart, Search as SearchIcon } from 'lucide-react';
import '../styles/Search.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const area = searchParams.get('area') || '';
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(query);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                let url = '';
                if (area) {
                    url = `http://localhost:5000/api/recipes/country?area=${area}`;
                } else {
                    url = `http://localhost:5000/api/recipes?query=${query}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                setRecipes(data.meals || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
        setSearchInput(query);
    }, [query, area]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?q=${searchInput}`);
        }
    };

    return (
        <div className="search-page-v2">
            <div className="search-container-v2">
                {/* Search Navigation Bar */}
                <div className="search-nav-v2">
                    <form className="inline-search-v2" onSubmit={handleSearchSubmit}>
                        <SearchIcon size={20} color="#ff6f61" />
                        <input
                            type="text"
                            placeholder="Search for another dish..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </form>

                    <div className="search-filters-v2">
                        <button className="filter-pill-v2 active">
                            <Filter size={16} /> Filter
                        </button>
                        <button className="filter-pill-v2">Sort By</button>
                        <button className="filter-pill-v2">Ratings 4.0+</button>
                        <button className="filter-pill-v2">Veg only</button>
                    </div>
                </div>

                {/* Header Section */}
                <div className="search-header-v2">
                    <h1>
                        {area
                            ? `${area} Cuisine`
                            : (query ? `Results for "${query}"` : 'Explore World Cuisine')}
                    </h1>
                    <p>{recipes.length} dishes identified from around the world</p>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="search-loader-v2">
                        <Loader2 className="animate-spin" size={48} color="#ff6f61" />
                        <p>Preparing the kitchen...</p>
                    </div>
                ) : (
                    <div className="recipes-grid-v2">
                        {recipes.map((recipe, index) => (
                            <motion.div
                                key={recipe.idMeal}
                                className="recipe-card-v2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                            >
                                <div className="card-image-wrapper-v2">
                                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                    <div className="card-image-overlay-v2">
                                        <div className="card-badge-v2">{recipe.strCategory || 'Gourmet'}</div>
                                        <button className="favorite-btn-v2" onClick={(e) => { e.stopPropagation(); }}>
                                            <Heart size={18} />
                                        </button>
                                    </div>
                                    <div className="promo-tag-v2">Top Rated</div>
                                </div>
                                <div className="card-body-v2">
                                    <h3 className="card-title-v2">{recipe.strMeal}</h3>
                                    <div className="card-stats-row-v2">
                                        <div className="rating-pill-v2">
                                            <Star size={14} fill="currentColor" />
                                            <span>{(4 + Math.random()).toFixed(1)}</span>
                                        </div>
                                        <span className="dot-separator">•</span>
                                        <div className="time-stat-v2">
                                            <Clock size={14} />
                                            <span>{Math.floor(Math.random() * 30 + 15)} mins</span>
                                        </div>
                                    </div>
                                    <p className="card-meta-v2">{recipe.strArea || 'International'} • {recipe.strCategory}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {(!loading && recipes.length === 0) && (
                    <div className="empty-search-v2">
                        <div className="empty-icon-v2">😕</div>
                        <h3>No dishes found for "{query}"</h3>
                        <p>We couldn't find exactly what you're looking for. Try a different search terms or explore our top categories.</p>
                        <button onClick={() => navigate('/dashboard')} className="cta-btn-v2">Back to Dashboard</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
