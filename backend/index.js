const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to read users
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

// Helper to write users
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    const { email, password, phone, name } = req.body;
    const users = readUsers();

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword, phone, name };
    users.push(newUser);
    writeUsers(users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone } });
});

app.post('/api/auth/login', async (req, res) => {
    const { identifier, password } = req.body; // identifier can be email or phone
    const users = readUsers();
    const user = users.find(u => u.email === identifier || u.phone === identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
});

// Recipe Routes
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

app.get('/api/recipes/country', async (req, res) => {
    const { area } = req.query;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching country recipes", error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Food Recipe API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
