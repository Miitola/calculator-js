let screen = document.getElementById('calculator-screen');
let screenValue = '0';
let firstValue = null;
let previousOperator = null;
let waitingForSecondValue = false;

function inputDigit(digit) {
    if (waitingForSecondValue) {
        waitingForSecondValue = false;
        screenValue = digit;
    } else {
        screenValue = screenValue === '0' ? digit : screenValue + digit;
    }
    updateScreenDisplay();
}

function inputDecimal() {
    if (waitingForSecondValue) {
        screenValue = '0.';
        waitingForSecondValue = false;
    } else if (!screenValue.includes('.')) {
        screenValue = screenValue + '.';
    }
    updateScreenDisplay();
}

function toggleSign() {
    screenValue = (parseFloat(screenValue) * -1).toString();
    if (waitingForSecondValue) {
        firstValue = screenValue;
    }
    updateScreenDisplay();
}

function clearEntry() {
    screenValue = screenValue.slice(0, -1);
    if (screenValue.length === 0) {
        screenValue = '0';
    }
    updateScreenDisplay();
}

function allClear() {
    firstValue = null;
    screenValue = '0';
    previousOperator = null;
    waitingForSecondValue = false;
    updateScreenDisplay();
}

function handleOperator(currentOperator) {
    const inputValue = parseFloat(screenValue);

    if (firstValue === null && !isNaN(inputValue)) {
        firstValue = inputValue;
    } else if (previousOperator) {
        const result = calculate(firstValue, previousOperator, inputValue);
        screenValue = String(result);
        firstValue = result;
    }

    previousOperator = currentOperator;
    waitingForSecondValue = true;
    updateScreenDisplay();
}

function calculate(first, operator, second) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
    return second;
}

function updateScreenDisplay() {
    screen.textContent = screenValue;
}

// Example event listeners (assuming you have buttons with corresponding classes in your HTML)
document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', event => inputDigit(event.target.textContent));
});
document.querySelector('.decimal').addEventListener('click', inputDecimal);
document.querySelector('.all-clear').addEventListener('click', allClear);
document.querySelector('.clear-entry').addEventListener('click', clearEntry);
document.querySelector('.toggle-sign').addEventListener('click', toggleSign);
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', event => handleOperator(event.target.textContent));
});
