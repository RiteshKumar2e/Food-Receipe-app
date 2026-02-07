import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, PlayCircle, Globe, ListChecks, Clock, Star, Heart, Share2, Info, CheckCircle2 } from 'lucide-react';
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
        const response = await fetch(`http://localhost:5000/api/recipes/lookup/${id}`);
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
    <div className="recipe-loading-v2">
      <div className="shimmer-v2"></div>
      <p>Gathering fresh ingredients...</p>
    </div>
  );

  if (!recipe) return (
    <div className="recipe-not-found-v2">
      <h2>Oops! Dish not found</h2>
      <button onClick={() => navigate('/dashboard')} className="back-home-v2">Back to Menu</button>
    </div>
  );

  return (
    <div className="recipe-page-v2">
      {/* Header / Top Navigation */}
      <div className="recipe-nav-v2">
        <button onClick={() => navigate(-1)} className="nav-icon-v2">
          <ChevronLeft size={24} />
        </button>
        <div className="nav-actions-v2">
          <button className="nav-icon-v2"><Share2 size={20} /></button>
          <button className="nav-icon-v2"><Heart size={20} /></button>
        </div>
      </div>

      <div className="recipe-hero-v2">
        <motion.div
          className="hero-image-container-v2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className="hero-overlay-v2"></div>
        </motion.div>

        <div className="hero-content-v2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-text-card-v2"
          >
            <div className="dish-badges-v2">
              <span className="category-badge-v2">{recipe.strCategory}</span>
              <span className="area-badge-v2"><Globe size={14} /> {recipe.strArea}</span>
            </div>
            <h1 className="dish-name-v2">{recipe.strMeal}</h1>
            <div className="dish-summary-v2">
              <div className="summary-item-v2 rating">
                <Star size={18} fill="#ff6f61" color="#ff6f61" />
                <strong>4.8</strong> <span>(500+ Reviews)</span>
              </div>
              <div className="summary-item-v2">
                <Clock size={18} />
                <strong>45 mins</strong>
              </div>
            </div>
            <p className="dish-tags-v2">
              {recipe.strTags ? recipe.strTags.split(',').map(tag => `#${tag.trim()}`).join(' • ') : '#Healthy • #Authentic'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="recipe-body-v2">
        <div className="recipe-main-content-v2">
          {/* Ingredients Section */}
          <section className="dish-section-v2">
            <div className="section-title-v2">
              <ListChecks size={22} color="#ff6f61" />
              <h2>Ingredients</h2>
              <span className="item-count-v2">{getIngredients(recipe).length} items</span>
            </div>
            <div className="ingredients-grid-v2">
              {getIngredients(recipe).map((ing, i) => (
                <div key={i} className="ing-card-v2">
                  <div className="ing-info-v2">
                    <h4>{ing.name}</h4>
                    <p>{ing.measure}</p>
                  </div>
                  <CheckCircle2 size={18} color="#24963f" />
                </div>
              ))}
            </div>
          </section>

          {/* Instructions Section */}
          <section className="dish-section-v2">
            <div className="section-title-v2">
              <Info size={22} color="#ff6f61" />
              <h2>Preparation Steps</h2>
            </div>
            <div className="steps-container-v2">
              {recipe.strInstructions.split('\r\n').map((step, i) => (
                step.trim() && (
                  <div key={i} className="step-item-v2">
                    <div className="step-number-v2">{i + 1}</div>
                    <p className="step-text-v2">{step}</p>
                  </div>
                )
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <aside className="recipe-sidebar-v2">
          <div className="sidebar-card-v2">
            <h3>Watch and Learn</h3>
            <p>Prefer a visual guide? Watch the full video tutorial on YouTube.</p>
            {recipe.strYoutube ? (
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="youtube-cta-v2">
                <PlayCircle size={22} /> Watch Video
              </a>
            ) : (
              <div className="no-video-v2">Video tutorial unavailable</div>
            )}
          </div>

          <div className="sidebar-card-v2 promo-sidebar-v2">
            <h3>Cooking Tips</h3>
            <ul>
              <li>Wash all vegetables thoroughly.</li>
              <li>Use fresh spices for better aroma.</li>
              <li>Pre-heat your oven/pan as needed.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecipeDetail;
