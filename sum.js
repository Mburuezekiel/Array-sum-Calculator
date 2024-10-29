function calculateSum() {
    const input = document.getElementById('numbers').value.trim();
    const result = document.getElementById('result');
    const visualizer = document.getElementById('visualizer');
    
    // Reset displays
    result.style.display = 'none';
    visualizer.style.display = 'none';
    
    // Check if input is empty
    if (!input) {
        showError('Please enter some numbers');
        return;
    }

    // Split input into array
    const numbers = input.split(',');
    
    // Validate and convert input
    const validNumbers = [];
    const invalidInputs = [];
    
    numbers.forEach((num, index) => {
        const trimmedNum = num.trim();
        if (isValidNumber(trimmedNum)) {
            validNumbers.push(parseFloat(trimmedNum));
        } else {
            invalidInputs.push(`${trimmedNum} (at position ${index + 1})`);
        }
    });

    // Handle invalid inputs
    if (invalidInputs.length > 0) {
        showError(`Invalid input(s) detected: ${invalidInputs.join(', ')}`);
        return;
    }

    // Calculate sum
    let sum = 0;
    let steps = [];
    
    validNumbers.forEach((num, index) => {
        sum += num;
        steps.push(`
            <div class="visualizer-step animate__animated animate__fadeInLeft" style="animation-delay: ${index * 0.1}s">
                Step ${index + 1}: ${sum - num} + ${num} = ${sum}
            </div>
        `);
    });

    // Show result
    result.innerHTML = `Final Sum: ${sum}`;
    result.className = 'result success animate__animated animate__fadeIn';
    result.style.display = 'block';

    // Show visualization
    visualizer.innerHTML = steps.join('');
    visualizer.style.display = 'block';
}

function isValidNumber(str) {
    if (str === '') return false;
    const num = parseFloat(str);
    return !isNaN(num) && isFinite(num);
}

function showError(message) {
    const result = document.getElementById('result');
    result.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ${message}
    `;
    result.className = 'result error animate__animated animate__shakeX';
    result.style.display = 'block';
}

function useExample() {
// Generate an array of 5 random numbers between 1 and 100
const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000) + 1);

// Join the numbers into a string separated by commas
document.getElementById('numbers').value = randomNumbers.join(', ');

// Call the calculateSum function
calculateSum();
}

function clearInput() {
    document.getElementById('numbers').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('visualizer').style.display = 'none';
}