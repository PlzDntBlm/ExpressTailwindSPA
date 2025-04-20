const express = require('express');
const path = require('path');
const requireAuth = require('./middleware/authMiddleware');
const localsMiddleware = require('./middleware/localsMiddleware');

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// --- Global Middleware ---
app.use(localsMiddleware);

// --- Routes ---

// Main page route - Serves the base HTML structure
app.get('/', (req, res) => {
    res.render('index');
});

// --- Partial Routes ---

// Login partial route (NO auth required)
app.get('/partials/login', (req, res) => {
    res.render('partials/login');
});

// Home partial route (NO auth required for this example)
app.get('/partials/home', (req, res) => {
    res.render('partials/home');
});

// Profile partial route (Auth REQUIRED)
app.get('/partials/profile', requireAuth, (req, res) => {
    // Middleware already checked auth. If we get here, user is authenticated.
    // In a real app, fetch user data here if needed.
    res.render('partials/profile');
});


// --- Catch-all Route for Client-Side Routing ---
// This MUST be the LAST route definition
app.get('*', (req, res) => {
    console.log(`Catch-all route hit for path: ${req.path}. Serving index.ejs.`);
    // Always render the main index file. Client-side JS will handle the rest.
    // Ensure localsMiddleware runs before this to populate index.ejs correctly on direct load
    res.render('index');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});