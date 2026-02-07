document.addEventListener("DOMContentLoaded", () => {
    let result = document.getElementById("result");
    let searchBtn = document.getElementById("search-btn");
    let urlSearch = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    searchBtn.addEventListener("click", () => {
      let userInp = document.getElementById("user-inp").value.trim();
      if (userInp.length === 0) {
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
      } else {
        // Clear previous results
        result.innerHTML = "";
        
        // Fetch recipes by name search
        fetch(urlSearch + userInp)
          .then(handleResponse)
          .then(displayRecipes)
          .catch(handleError);
      }
    });
  
    function handleResponse(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  
    function displayRecipes(data) {
      if (data.meals) {
        let meals = data.meals;
        meals.forEach((myMeal) => {
          renderMealCard(myMeal);
        });
      } else {
        result.innerHTML += `<h3>No results found</h3>`;
      }
    }
  
    function displayCategories(data) {
      if (data.categories) {
        let categories = data.categories;
        categories.forEach((category) => {
          let categoryCard = document.createElement("div");
          categoryCard.classList.add("card", "mb-3");
          categoryCard.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">${category.strCategory}</h5>
              <p class="card-text">${category.strCategoryDescription}</p>
            </div>
          `;
          result.appendChild(categoryCard);
        });
      }
    }
  
    function displayRandomRecipe(data) {
      if (data.meals) {
        let randomMeal = data.meals[0];
        renderMealCard(randomMeal);
      } else {
        result.innerHTML += `<h3>No random recipe found</h3>`;
      }
    }
  
    function renderMealCard(myMeal) {
      let count = 1;
      let ingredients = [];
      for (let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
          ingredient = myMeal[i];
          measure = myMeal[`strMeasure` + count];
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
  
      let mealCard = document.createElement("div");
      mealCard.classList.add("card", "mb-3");
      mealCard.innerHTML = `
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${myMeal.strMealThumb}" class="card-img" alt="${myMeal.strMeal}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${myMeal.strMeal}</h5>
              <p class="card-text"><small class="text-muted">${myMeal.strArea}</small></p>
              <div class="ingredients mb-3">
                <ul class="list-group">
                  ${ingredients.map(i => `<li class="list-group-item">${i}</li>`).join('')}
                </ul>
              </div>
              <button class="btn btn-success show-recipe mb-2" data-meal='${JSON.stringify(myMeal)}'>View Recipe</button>
            </div>
          </div>
        </div>
      `;
      result.appendChild(mealCard);
  
      let showRecipeBtn = mealCard.querySelector('.show-recipe');
      showRecipeBtn.addEventListener('click', function() {
        let selectedMeal = JSON.parse(this.getAttribute('data-meal'));
        localStorage.setItem('selectedMeal', JSON.stringify(selectedMeal));
        window.location.href = 'recipe.html';
      });
    }
  
    function handleError(error) {
      console.error('Error fetching data:', error);
      result.innerHTML += `<h3>Failed to fetch data. Please try again later.</h3>`;
    }
  });
  