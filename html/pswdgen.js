document.getElementById('generateBtn').addEventListener('click', generatePassword);

function generatePassword() {
    const length = 12;
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allCharacters = upperCase + lowerCase + numbers + symbols;
    let password = '';

    // Ensure password contains at least one character from each character set
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest of the password length
    for (let i = password.length; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Shuffle the password to avoid predictable patterns
    password = shuffle(password);

    // Display the password
    document.getElementById('password').innerText = password;
}

function shuffle(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
