import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, PlayCircle, Globe, ListChecks } from 'lucide-react';
import '../styles/Recipe.css';

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

  if (loading) return (
    <div className="page-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Loading...</div>
    </div>
  );

  if (!recipe) return (
    <div className="page-content" style={{ textAlign: 'center', padding: '5rem' }}>
      <h2>Recipe not found</h2>
      <button onClick={() => navigate('/')} className="back-btn" style={{ margin: '2rem auto' }}>Return Home</button>
    </div>
  );

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
    </div>
  );
};

export default RecipeDetail;
