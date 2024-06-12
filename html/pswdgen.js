document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateBtn').addEventListener('click', generatePassword);
});

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()';

    let allCharacters = '';
    if (includeLowercase) allCharacters += lowerCase;
    if (includeUppercase) allCharacters += upperCase;
    if (includeNumbers) allCharacters += numbers;
    if (includeSymbols) allCharacters += symbols;

    if (allCharacters.length === 0) {
        alert('At least one character set must be selected');
        return;
    }

    let password = '';

    // Fill the password length with random characters from the selected sets
    for (let i = 0; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Display the message and the password
    document.getElementById('message').innerText = "Here's your new password:";
    document.getElementById('password').innerText = password;
}
