document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  errorMessage.textContent = '';

  if (email === '' || password === '') {
    errorMessage.textContent = 'Please fill in all fields.';
    return;
  }

  // Placeholder until database
  if (email === 'loganmtemplin@gmail.com' && password === 'Password123') { // Change to a working email to test
    // Send request to server to send verification email
    fetch('http://localhost:3000/send-login-verification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => response.json()) 
    .then(data => {
      if (data.error) {
        errorMessage.textContent = 'Failed to send verification email.';
        console.error(data.error);
      } else {
        alert('Verification code sent to your email');
        document.getElementById('login-step').style.display = 'none';
        document.getElementById('code-step').style.display = 'block';
        // Store the email in a hidden input for later use
        document.getElementById('hidden-email').value = email;
        console.log(`Stored email for verification: ${email}`);
      }
    })
    .catch(error => {
      errorMessage.textContent = 'Failed to send verification email.';
      console.error('Error:', error);
    });
  } else {
    errorMessage.textContent = 'Invalid email or password.';
  }
});

document.getElementById('codeForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const code = document.getElementById('code').value;
  const errorMessage = document.getElementById('code-error-message');
  const email = document.getElementById('hidden-email').value;
  errorMessage.textContent = '';
  console.log(`Verifying code: ${code} for email: ${email}`);

  // Send the code and email to the server for verification
  fetch('http://localhost:3000/verify-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, code: code })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Verification response:', data);
    if (data.valid) {
      window.location.href = 'welcome.html';
    } else {
      errorMessage.textContent = 'Invalid verification code.';
    }
  })
  .catch(error => {
    errorMessage.textContent = 'Failed to verify the code.';
    console.error('Error:', error);
  });
});

document.getElementById('createAccountButton').addEventListener('click', function() {
  window.location.href = 'create_account.html';
});
