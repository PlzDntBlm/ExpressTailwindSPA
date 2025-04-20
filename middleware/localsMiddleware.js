/**
 * Middleware to attach global data to res.locals, making it
 * available to all EJS templates rendered during the request.
 */
function localsMiddleware(req, res, next) {
    // Static data available everywhere
    res.locals.siteTitle = 'Aristocrat Messenger';

    // Dynamic data based on request (e.g., authentication status)
    // Simulating user based on the query param for now
    const isAuthenticated = req.query.authenticated === 'true';
    if (isAuthenticated) {
        // In a real app, this would come from req.session.user or a decoded JWT
        res.locals.currentUser = {
            username: 'DemoUser', // Placeholder username
            // Add other user properties as needed
        };
    } else {
        res.locals.currentUser = null;
    }

    // Ensure this data is available for subsequent middleware and routes
    next();
}

module.exports = localsMiddleware;