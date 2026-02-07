import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Users, PlayCircle, Globe, ListChecks } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
    window.scrollTo(0, 0);
  }, [id]);

  const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ name: ingredient, measure: measure });
      }
    }
    return ingredients;
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!recipe) return <div className="error">Recipe not found</div>;

  return (
    <div className="page-content">
      <motion.button
        className="back-btn"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ChevronLeft size={20} />
        Back to search
      </motion.button>

      <div className="recipe-detail-grid">
        <motion.div
          className="recipe-visuals"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="main-image" />
          <div className="quick-info">
            <div className="info-item">
              <Globe size={20} />
              <span>{recipe.strArea}</span>
            </div>
            <div className="info-item">
              <ListChecks size={20} />
              <span>{recipe.strCategory}</span>
            </div>
            {recipe.strYoutube && (
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="info-item youtube">
                <PlayCircle size={20} />
                <span>Video Tutorial</span>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="recipe-info-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="recipe-title-main">{recipe.strMeal}</h1>
          <p className="tags">{recipe.strTags?.split(',').join(' • ')}</p>

          <div className="ingredients-section">
            <h3>Ingredients</h3>
            <div className="ingredients-list">
              {getIngredients(recipe).map((ing, i) => (
                <div key={i} className="ingredient-item">
                  <span className="ing-measure">{ing.measure}</span>
                  <span className="ing-name">{ing.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="instructions-section">
            <h3>Instructions</h3>
            <div className="instructions-text">
              {recipe.strInstructions.split('\r\n').map((step, i) => (
                step.trim() && <p key={i}>{step}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .back-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          margin-bottom: 2rem;
          font-weight: 500;
          transition: color 0.3s;
        }

        .back-btn:hover {
          color: var(--primary);
        }

        .recipe-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .main-image {
          width: 100%;
          border-radius: 2rem;
          box-shadow: var(--shadow-md);
          margin-bottom: 2rem;
        }

        .quick-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .info-item {
          background: white;
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-sm);
        }

        .info-item.youtube {
          color: var(--primary);
          text-decoration: none;
          border-color: var(--primary);
        }

        .recipe-title-main {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }

        .tags {
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
          margin-bottom: 3rem;
        }

        .ingredients-section h3, .instructions-section h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid var(--primary);
          padding-left: 1rem;
        }

        .ingredients-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 4rem;
        }

        .ingredient-item {
          padding: 1rem;
          background: white;
          border: 1px solid var(--glass-border);
          border-radius: 0.75rem;
          display: flex;
          gap: 0.5rem;
          font-size: 0.95rem;
          box-shadow: var(--shadow-sm);
        }

        .ing-measure {
          color: var(--primary);
          font-weight: 700;
        }

        .instructions-text p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        @media (max-width: 1024px) {
          .recipe-detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeDetail;
