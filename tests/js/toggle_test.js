document.addEventListener('DOMContentLoaded', function() {
    function testToggleButtons() {
        const checkboxes = [
            document.getElementById('includeLowercase'),
            document.getElementById('includeUppercase'),
            document.getElementById('includeNumbers'),
            document.getElementById('includeSymbols')
        ];

        let allPassed = true;

        checkboxes.forEach(checkbox => {
            const initialState = checkbox.checked;

            // Toggle the checkbox
            checkbox.click();
            const toggledState = checkbox.checked;

            // Toggle back to the original state
            checkbox.click();
            const finalState = checkbox.checked;

            if (initialState === toggledState || initialState !== finalState) {
                console.error(`Test failed for ${checkbox.id}`);
                allPassed = false;
            } else {
                console.log(`Test passed for ${checkbox.id}`);
            }
        });

        if (allPassed) {
            console.log("All toggle button tests passed!");
        } else {
            console.log("Some toggle button tests failed.");
        }
    }

    testToggleButtons();
});
