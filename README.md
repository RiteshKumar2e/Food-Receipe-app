# 🍳 Gourmet Haven - The Ultimate Food Discovery Platform

<div align="center">
  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80" width="100%" style="border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" />
  
  <br />

  <h1>✨ A Premium Culinary Journey ✨</h1>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" />
    <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express" />
    <img src="https://img.shields.io/badge/MongoDB-9.x-47A248?style=for-the-badge&logo=mongodb" />
    <img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite" />
  </p>

  **Gourmet Haven** is a state-of-the-art recipe discovery engine inspired by modern food delivery aesthetics like Zomato and Swiggy. It features a massive database of 2500+ authentic Indian, Chinese, and Italian dishes with a premium user experience.
</div>

---

## 🚀 Key Features

### 💎 Ultra-Premium UI/UX
- **Zomato-Inspired Dashboard**: Circular cuisine navigators and immersive handpicked collections.
- **Glassmorphic Navigation**: A sleek, translucent header that tracks your scroll.
- **Micro-Animations**: Powered by `Framer Motion` for smooth transitions and interactive feedback.

### 🍱 Extensive Culinary Database
- **2500+ Handcrafted Dishes**: A specialized local database focusing on **Indian**, **Chinese**, and **Italian** cuisines.
- **Smart Diet Logic**: Instant **Veg/Non-Veg** toggling with professional industry-standard indicators.
- **Chef-Level Details**: Each recipe includes precise ingredients, step-by-step instructions, and YouTube tutorials.

### ⚡ Cutting-Edge Performance
- **Instant Search**: Optimized backend fetching that delivers 2500+ results in milliseconds.
- **Responsive Design**: Flawless experience across Mobile, Tablet, and Desktop.

---

## 🛠️ Tech Stack & Architecture

```mermaid
graph TD
    A[Frontend: React + Vite] -->|Axios| B[Backend: Express API]
    B --> C[(Local JSON Database)]
    B --> D[External Culinary APIs]
    A --> E[State Management: AuthContext]
    A --> F[Styling: Vanilla CSS + Framer Motion]
```

- **Frontend**: React 18, Vite, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, JWT Authentication, Bcrypt.
- **Assets**: High-resolution Unsplash imagery for realistic dish representation.

---

## 📸 Sneak Peek

| Dashboard Experience | Recipe Analytics | Search Intelligence |
| :--- | :--- | :--- |
| ![Dash](https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80) | ![Recipe](https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80) | ![Search](https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80) |

---

## ⚙️ Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
node seed_recipes.js  # Generate the 2500 recipe database
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Roadmap
- [ ] AI-Powered Ingredient Recognition from Photos.
- [ ] Real-time "Cooking Mode" with Voice Control.
- [ ] Social Features: Follow your favorite Home Chefs.
- [ ] Personalized Meal Planning based on Macros.

---

<div align="center">
  <p>Created with ❤️ for food lovers everywhere.</p>
  <img src="https://img.shields.io/badge/Designed%20By-Antigravity-orange?style=for-the-badge" />
</div>
