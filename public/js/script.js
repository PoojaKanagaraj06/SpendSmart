document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const addIncomeForm = document.getElementById('add-income-form');
    const addExpenseForm = document.getElementById('add-expense-form');
    const express = require('express');
    const path = require('path');
    const app = express();
    
    // Serve static files from the 'frontend' directory
    app.use(express.static(path.join(__dirname, 'frontend')));
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    });
    
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            document.getElementById('signupmessage').textContent = data.message;

            if (response.ok) {
                // Save the username in localStorage
                localStorage.setItem('username', data.name);
                
                window.location.href = 'login.html';
    
            }
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            document.getElementById('loginmessage').textContent = data.message;

            if (response.ok) {
                // Save the username in localStorage
                localStorage.setItem('username', data.name);
                document.getElementById('loginmessage').textContent = '';
                loginForm.reset();
                
                window.location.href = 'mainpage.html';
            }
        });
    }

    // Display Username on Main Page
const usernameElements = [document.getElementById('username'), document.getElementById('greetuser')];
const username = localStorage.getItem('username');

if (usernameElements.every(element => element !== null)) {
    if (username) {
        usernameElements.forEach(element => {
            element.textContent = username;
        });
        fetchIncomeData(); // Fetch income data after displaying the username
        fetchExpenseData(); // Fetch expense data after displaying the username
    } else {
        window.location.href = 'login.html'; // Redirect if no username is found
    }
}

    
    
    

    
});