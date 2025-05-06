document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

async function handleSignup(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Clear previous errors
    clearErrors();
    
    // Validate inputs
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return;
    }
    
    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }
        
        // Redirect to dashboard or show success message
        alert('Signup successful! You can now log in.');
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Signup error:', error);
        showError('form', error.message || 'An error occurred during signup');
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
}
// login
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    clearErrors();
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Save the token and redirect
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        // Redirect to dashboard or home page
        window.location.href = '/dashboard.html';
    } catch (error) {
        console.error('Login error:', error);
        showError('form', error.message || 'Invalid credentials');
    }
}
function updateNavigation() {
    const token = localStorage.getItem('token');
    const nav = document.querySelector('nav ul');
    
    if (nav) {
        if (token) {
            nav.innerHTML = `
                <li><a href="/index.html">Home</a></li>
                <li><a href="/dashboard.html" class="active">Dashboard</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            `;
            document.getElementById('logout').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                window.location.href = '/index.html';
            });
        } else {
            nav.innerHTML = `
                <li><a href="/index.html">Home</a></li>
                <li><a href="/index.html#about">About</a></li>
                <li><a href="/signup.html">Sign Up</a></li>
                <li><a href="/login.html">Login</a></li>
            `;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();

});