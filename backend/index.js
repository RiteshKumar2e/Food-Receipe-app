const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample route for recipes (we can expand this later)
app.get('/api/recipes', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Food Recipe API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
