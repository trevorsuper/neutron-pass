document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('create-error-message');

    errorMessage.textContent = '';

    if (email === '' || password === '' || confirmPassword === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // Send a request to the server to send the verification email
    fetch('http://localhost:3000/send-verification-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.text())
    .then(data => {
        if (data.error) {
            errorMessage.textContent = 'Failed to send verification email.';
            console.error(data.error);
        } else {
            alert('Account created successfully! Please check your email for verification.');
            window.location.href = 'landing.html';
        }
    })
    .catch(error => {
        errorMessage.textContent = 'Failed to send verification email.';
        console.error('Error:', error);
    });
});
