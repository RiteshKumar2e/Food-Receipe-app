import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Loader2 } from 'lucide-react';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/recipes?query=${query}`);
                const data = await response.json();
                setRecipes(data.meals || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [query]);

    return (
        <div className="page-content">
            <div className="search-header">
                <div className="search-meta">
                    <h1>{query ? `Results for "${query}"` : 'Explore Recipes'}</h1>
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
                                <div className="recipe-badge">{recipe.strCategory}</div>
                            </div>
                            <div className="recipe-content">
                                <h3 className="recipe-title">{recipe.strMeal}</h3>
                                <div className="recipe-meta">
                                    <span>{recipe.strArea}</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>View Details</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {(!loading && recipes.length === 0) && (
                <div className="no-results">
                    <h3>No recipes found for "{query}"</h3>
                    <p>Try different keywords or browse our categories.</p>
                </div>
            )}

            <style jsx>{`
        .search-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          padding-top: 2rem;
        }

        .search-meta h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .search-meta p {
          color: var(--text-muted);
        }

        .search-actions {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--primary);
        }

        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
          color: var(--text-muted);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .no-results {
          text-align: center;
          padding: 5rem 2rem;
        }

        .no-results h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
      `}</style>
        </div>
    );
};

export default SearchResults;
