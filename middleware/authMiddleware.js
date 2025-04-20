// middleware/authMiddleware.js

function requireAuth(req, res, next) {
    // Placeholder check: Use query param for demo purposes
    // In a real app, check req.session.user or a JWT
    const isAuthenticated = req.query.authenticated === 'true';

    if (!isAuthenticated) {
        // If user isn't "logged in", send 401 Unauthorized status
        console.log('Auth check failed, sending 401');
        // No content needed, just the status for the client script to check
        return res.status(401).send('Authentication Required');
    }

    // If authenticated, proceed
    console.log('Auth check passed');
    next();
}

module.exports = requireAuth;