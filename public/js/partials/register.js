// public/js/partials/register.js

console.log("Executing register.js script"); // Add log to confirm execution

// Find the form and message div within the currently loaded partial
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('registerMessage'); // Assumes ID exists in register.ejs

if (registerForm && messageDiv) {
    registerForm.addEventListener('submit', handleRegister);
    console.log("Attached submit listener to register form.");
} else {
    console.error("Could not find register form or message div for attaching listener.");
}

async function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const formData = new FormData(form);

    console.log("handleRegister called"); // Log function call

    messageDiv.textContent = 'Registering...';
    messageDiv.className = 'mb-4 text-sm text-gray-600'; // Reset style

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        const result = await response.json(); // Expect JSON response

        if (response.ok) {
            messageDiv.textContent = result.message || 'Registration successful! Please log in.';
            messageDiv.className = 'mb-4 text-sm text-green-600';
            form.reset();
            // We need access to loadPartial, which isn't defined here.
            // Instead of redirecting here, we rely on the message.
            // A more advanced setup might use custom events or a global app object.
            console.log('Registration successful, user should navigate to login.');
            // Example: Trigger a custom event that index.ejs listens for
            // document.dispatchEvent(new CustomEvent('auth:registered', { detail: { shouldLoadLogin: true } }));
        } else {
            messageDiv.textContent = result.message || `Registration failed: ${response.statusText}`;
            messageDiv.className = 'mb-4 text-sm text-red-600';
        }
    } catch (error) {
        console.error('Registration error:', error);
        messageDiv.textContent = 'An error occurred during registration.';
        messageDiv.className = 'mb-4 text-sm text-red-600';
    }
}

// If you need to clean up event listeners when the partial is removed,
// you would typically store the listener function and remove it.
// This requires a more complex lifecycle management system. For now, we assume
// the listener gets removed when the #content innerHTML is replaced.