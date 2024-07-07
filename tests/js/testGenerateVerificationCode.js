function generateVerificationCode() {
    const length = 6;
    const numbers = '0123456789';
    let randomCode = '';
    for (let i = 0; i < length; i++) {
      randomCode += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return randomCode;
  }
  
  // Test function to run assertions
  function testGenerateVerificationCode() {
    // Test 1: Ensure the generated code is a string of length 6
    const code = generateVerificationCode();
    console.assert(typeof code === 'string', 'Expected the code to be a string');
    console.assert(code.length === 6, 'Expected the code to be 6 characters long');
  
    // Test 2: Ensure the code consists only of numbers
    const isNumeric = /^\d{6}$/.test(code);
    console.assert(isNumeric, 'Expected the code to contain only numbers');
  
    // Test 3: Ensure that subsequent calls generate different codes
    const code1 = generateVerificationCode();
    const code2 = generateVerificationCode();
    console.assert(code1 !== code2, 'Expected subsequent calls to generate different codes');
  
    console.log('All tests passed!');
  }
  
testGenerateVerificationCode();