const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Routes for tab partials
app.get('/tab/home', (req, res) => {
    // Render only the portion of the "Home" tab
    res.render('partials/home'); // partials/home.ejs
});

app.get('/tab/profile', (req, res) => {
    // Render partial for "Profile" tab
    res.render('partials/profile'); // partials/profile.ejs
});

app.get('/tab/settings', (req, res) => {
    // Render partial for "Settings" tab
    res.render('partials/settings'); // partials/settings.ejs
});

// Serve your main page at /
app.get('/', (req, res) => {
    // Typically you have a root template that includes tab links and a "content" area
    res.render('index'); // index.ejs
});

app.listen(3000, () => console.log('Server started on port 3000'));