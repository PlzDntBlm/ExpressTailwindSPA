// app.js (Re-adding Auth Setup)
const express = require('express');
const path = require('path');
const session = require('express-session'); // <-- Add Session
const bcrypt = require('bcrypt'); // <-- Add Bcrypt

// Middleware & Router requires
const requireAuth = require('./middleware/authMiddleware'); // Assuming this still exists
const localsMiddleware = require('./middleware/localsMiddleware'); // Assuming this still exists
const partialRoutes = require('./routes/partials');

const app = express();
const PORT = 3000;
const saltRounds = 10; // Cost factor for bcrypt hashing

// --- In-Memory User Store (Replace with DB later) ---
const users = []; // Store users like { id, username, passwordHash }

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (Ensure 'public' directory exists)
app.use(express.static(path.join(__dirname, 'public')));

// --- Body Parsing Middleware ---
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data

// --- Session Middleware Setup ---
app.use(session({
    secret: 'your secret key goes here again', // TODO: Replace with a strong, env-variable based secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
        maxAge: 1000 * 60 * 60 * 24 // Example: 1 day
    }
}));

// --- Global Middleware ---
// Make sure localsMiddleware runs AFTER session is available
app.use(localsMiddleware);

// --- Routes ---

// Main page route
app.get('/', (req, res) => {
    res.render('index');
});

// --- Authentication API Routes ---

// POST route for registration
app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Registration attempt:', { username }); // Log attempt

    if (!username || !password) {
        console.log('Registration failed: Missing username or password');
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if username already exists (case-insensitive check might be better)
    const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
        console.log(`Registration failed: Username '${username}' already taken`);
        return res.status(409).json({ message: 'Username already taken.' });
    }

    try {
        // Hash the password
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Store the new user
        const newUser = {
            id: Date.now().toString(),
            username: username,
            passwordHash: passwordHash
        };
        users.push(newUser);
        console.log('User registered:', { id: newUser.id, username: newUser.username });
        // console.log('Current users:', users.map(u => ({id: u.id, username: u.username}))); // Avoid logging hashes

        // Send success response
        res.status(201).json({ message: 'Registration successful! Please log in.' });

    } catch (error) {
        console.error("Error during registration hashing/storing:", error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// TODO: Add POST /auth/login route
// TODO: Add GET/POST /auth/logout route


// --- Mount Routers ---
app.use('/partials', partialRoutes); // Handles GET /partials/*

// --- Catch-all Route ---
// Must be LAST
app.get('*', (req, res) => {
    console.log(`Catch-all route hit for path: ${req.path}. Serving index.ejs.`);
    res.render('index');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});