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
    if (email === 'test@example.com' && password === 'Password123') {
        
        alert('Verification code sent to your email');

        document.getElementById('login-step').style.display = 'none';
        document.getElementById('code-step').style.display = 'block';
    } else {
        errorMessage.textContent = 'Invalid email or password.';
    }
});

document.getElementById('codeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const code = document.getElementById('code').value;
    const errorMessage = document.getElementById('code-error-message');

    errorMessage.textContent = '';

    // error prompt
    if (code === '') {
        errorMessage.textContent = 'Please enter the verification code.';
        return;
    }

    // Placeholder until database
    if (code === '123456') {
        //setCookie("email", "test@example.com", "password", "008c70392e3abfbd0fa47bbc2ed96aa99bd49e159727fcba0f2e6abeb3a9d601", 0.25);
        window.location.href = 'welcome.html';
        // Redirect to another page or perform other actions
    } else {
        errorMessage.textContent = 'Invalid verification code.';
    }
});

document.getElementById('createAccountButton').addEventListener('click', function() {
    window.location.href = 'create_account.html';
});

/*
function setCookie(email_literal, email_actual, password_literal, password_actual, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${email_literal}=${email_actual};`;
    document.cookie = `${password_literal}=${password_actual};`;
    //console.log(document.cookie); // debug log to read the cookies
}*/