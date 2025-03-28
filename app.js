// app.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 1) Serve a single EJS for all main routes:
//    e.g. /, /home, /profile, /settings
app.get(['/', '/home', '/profile', '/settings'], (req, res) => {
    // Always render the same index.ejs
    res.render('index');
});

// 2) Routes to return *partials* only (for dynamic injection)
app.get('/partials/home', (req, res) => {
    res.render('partials/home');
});

app.get('/partials/profile', (req, res) => {
    res.render('partials/profile');
});

app.get('/partials/settings', (req, res) => {
    res.render('partials/settings');
});

// 3) (Optional) Serve static assets from "public"
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
