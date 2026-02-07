import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import '../styles/Search.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const area = searchParams.get('area') || '';
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, [query, area]);

    return (
        <div className="page-content">
            <div className="search-header">
                <div className="search-meta">
                    <h1>
                        {area
                            ? `${area} Cuisine`
                            : (query ? `Results for "${query}"` : 'Explore Recipes')}
                    </h1>
                    <p>{recipes.length} delicious recipes found</p>
                </div>

                <div className="search-actions">
                    <button className="action-btn">
                        <Filter size={18} />
                        Category
                    </button>
                    <button className="action-btn">
                        <SlidersHorizontal size={18} />
                        Filters
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loader-container">
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                    <p>Scouring our culinary archives...</p>
                </div>
            ) : (
                <div className="recipes-grid">
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={recipe.idMeal}
                            className="recipe-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                        >
                            <div className="recipe-image-wrapper">
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                                {recipe.strCategory && <div className="recipe-badge">{recipe.strCategory}</div>}
                            </div>
                            <div className="recipe-content">
                                <h3 className="recipe-title">{recipe.strMeal}</h3>
                                <div className="recipe-meta">
                                    <span>{recipe.strArea || area}</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>View Details</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {(!loading && recipes.length === 0) && (
                <div className="no-results">
                    <h3>No recipes found</h3>
                    <p>Try different keywords or browse our categories.</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
