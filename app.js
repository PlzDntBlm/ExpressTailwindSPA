// app.js (Refactored for Router)
const express = require('express');
const path = require('path');

// Keep middleware requires
const requireAuth = require('./middleware/authMiddleware'); // Used within router now
const localsMiddleware = require('./middleware/localsMiddleware');

// Require the new router
const partialRoutes = require('./routes/partials'); // <-- Add this

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (Ensure 'public' directory exists)
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsing Middleware (Keep if needed for future forms, remove if rolled back)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Session Middleware (Remove if rolled back)
// app.use(session({...}));

// --- Global Middleware ---
app.use(localsMiddleware); // Keep this

// --- Routes ---

// Main page route - Renders the SPA shell
app.get('/', (req, res) => {
    res.render('index');
});

// --- Mount Routers ---
app.use('/partials', partialRoutes); // <-- Mount the partials router

// --- Catch-all Route for Client-Side Routing ---
// Must be LAST
app.get('*', (req, res) => {
    console.log(`Catch-all route hit for path: ${req.path}. Serving index.ejs.`);
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});