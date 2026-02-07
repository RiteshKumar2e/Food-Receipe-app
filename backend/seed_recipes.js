const fs = require('fs');
const path = require('path');

const dishThemes = {
    Indian: {
        prefixes: ['Royal', 'Spicy', 'Tandoori', 'Hyderabadi', 'Punjabi', 'Mughlai', 'Kashmiri', 'Goan', 'Street Style', 'Home Style'],
        bases: ['Biryani', 'Chicken Curry', 'Paneer Butter Masala', 'Daal Makhani', 'Chana Masala', 'Aloo Gobi', 'Lamb Rogan Josh', 'Butter Chicken', 'Masala Dosa', 'Palak Paneer', 'Fish Curry', 'Prawn Masala', 'Vegetable Korma', 'Malai Kofta', 'Egg Curry'],
        suffixes: ['with Garlic Naan', 'Special', 'Handi', 'Dum', 'Tikka', 'Masala', 'Karahi', 'Bhurji'],
        images: [
            'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
            'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80',
            'https://images.unsplash.com/photo-1545231027-63b6f0a77ad1?w=800&q=80',
            'https://images.unsplash.com/photo-1601050638917-3d0191890731?w=800&q=80'
        ]
    },
    Italian: {
        prefixes: ['Classic', 'Artisan', 'Tuscan', 'Sicilian', 'Napoli', 'Creamy', 'Wood-fired', 'Homemade'],
        bases: ['Margherita Pizza', 'Penne Alfredo', 'Spaghetti Carbonara', 'Lasagna', 'Risotto', 'Fettuccine', 'Ravioli', 'Gnocchi', 'Bruschetta', 'Pesto Pasta', 'Calzone', 'Polenta'],
        suffixes: ['with Truffle Oil', 'Al Forno', 'Arrabbiata', 'Marinara', 'Primavera', 'Bolognese'],
        images: [
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80',
            'https://images.unsplash.com/photo-1546549032-9cb486981142?w=800&q=80'
        ]
    },
    Chinese: {
        prefixes: ['Szechuan', 'Cantonese', 'Spicy', 'Crispy', 'Wok-fired', 'Golden'],
        bases: ['Kung Pao Chicken', 'Hakka Noodles', 'Dim Sum', 'Spring Rolls', 'Fried Rice', 'Sweet and Sour Pork', 'Mapo Tofu', 'Chow Mein', 'Hot and Sour Soup', 'Manchurian'],
        suffixes: ['Special', 'with Chili Oil', 'Extra Spicy', 'Dragon Style', 'Chef Choice'],
        images: [
            'https://images.unsplash.com/photo-1512003867696-6d5ce11b7740?w=800&q=80',
            'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
            'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80'
        ]
    },
    American: {
        prefixes: ['Gourmet', 'Texas Style', 'BBQ', 'Double', 'Juicy', 'Ultimate'],
        bases: ['Cheeseburger', 'Chicken Wings', 'Hot Dog', 'Steak', 'Mac and Cheese', 'Club Sandwich', 'Pulled Pork', 'Grilled Cheese', 'Potato Salad'],
        suffixes: ['with Fries', 'Deluxe', 'Stack', 'Monster', 'Classic'],
        images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
            'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
            'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f6?w=800&q=80'
        ]
    }
};

const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'];

function generateRecipes(count) {
    const recipes = [];
    const themes = Object.keys(dishThemes);

    for (let i = 1; i <= count; i++) {
        const themeKey = themes[Math.floor(Math.random() * themes.length)];
        const theme = dishThemes[themeKey];

        const prefix = theme.prefixes[Math.floor(Math.random() * theme.prefixes.length)];
        const base = theme.bases[Math.floor(Math.random() * theme.bases.length)];
        const suffix = theme.suffixes[Math.floor(Math.random() * theme.suffixes.length)];
        const image = theme.images[Math.floor(Math.random() * theme.images.length)];

        const mealName = Math.random() > 0.5 ? `${prefix} ${base}` : `${base} ${suffix}`;
        const category = categories[Math.floor(Math.random() * categories.length)];

        const recipe = {
            idMeal: (10000 + i).toString(),
            strMeal: mealName,
            strCategory: category,
            strArea: themeKey,
            strInstructions: `1. Prepare all fresh ingredients. 2. Marinate the protein with spices and herbs for 30 minutes. 3. Heat oil in a large pan or wok. 4. Sauté onions, garlic, and ginger until aromatic. 5. Add the main base ingredients and cook until tender. 6. Season with salt, pepper, and secret sauces. 7. Garnish with fresh herbs and serve hot with side dishes. Enjoy your ${mealName}!`,
            strMealThumb: image,
            strTags: `${themeKey},Tasty,HomeMade`,
            strYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        };

        // Add pseudo ingredients
        for (let j = 1; j <= 10; j++) {
            recipe[`strIngredient${j}`] = `Ingredient ${j}`;
            recipe[`strMeasure${j}`] = `${Math.floor(Math.random() * 5 + 1)} units`;
        }

        recipes.push(recipe);
    }
    return recipes;
}

const data = generateRecipes(2500);
fs.writeFileSync(path.join(__dirname, 'data', 'recipes.json'), JSON.stringify(data, null, 2));
console.log('Generated 2500 recipes successfully!');
