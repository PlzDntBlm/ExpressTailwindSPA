const express = require('express');
const router = express.Router();
const path = require('path'); // Needed if rendering directly, though often data fetching happens here

// Middleware specific to these routes (if any) can be required here
// We need the auth middleware for profile, but using the placeholder version for now
const requireAuth = require('../middleware/authMiddleware'); // Adjust path as needed

// --- Partial Routes ---
// Note: Paths are relative to the mount point ('/partials' in app.js)

// GET /partials/login
router.get('/login', (req, res) => {
    // res.locals from global middleware are available here
    res.render('partials/login');
});

// GET /partials/home
router.get('/home', (req, res) => {
    res.render('partials/home');
});

// GET /partials/profile (Still using placeholder auth middleware)
router.get('/profile', requireAuth, (req, res) => {
    // If requireAuth passes (using old simulation logic for now), render profile
    res.render('partials/profile');
});

// Add other partial GET routes here as needed (e.g., /register, /scriptorium)
// GET /partials/register - Add this if you intend to add registration back soon
router.get('/register', (req, res) => {
    res.render('partials/register'); // Assuming register.ejs exists (without script block)
});


module.exports = router;