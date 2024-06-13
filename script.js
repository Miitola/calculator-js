let screen = document.getElementById('calculator-screen');
let screenValue = '0';
let firstValue = 0;
let previousOperator = null;
let waitingForSecondValue = false;
let screenMaxLength = 15;

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
        firstValue = parseFloat(screenValue);
    }
    updateScreenDisplay();
}

function getSquareRoot() {
    screenValue = Math.sqrt(parseFloat(screenValue)).toString();
    firstValue = parseFloat(screenValue);
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
    firstValue = 0;
    screenValue = '0';
    previousOperator = null;
    waitingForSecondValue = false;
    updateScreenDisplay();
}

function handleOperator(currentOperator) {
    const inputValue = parseFloat(screenValue);

    if (previousOperator && waitingForSecondValue) {
        previousOperator = currentOperator;
        return;
    }

    if (firstValue === 0) {
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

function separateScreenValueByComma(value) {
    let parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function exponentialFormat(value) {
    if (value.length > screenMaxLength) {
        return parseFloat(value).toExponential(8);
    }
    return value;
}

function updateScreenDisplay() {
    screen.textContent = separateScreenValueByComma(screenValue);
}

// Example event listeners (assuming you have buttons with corresponding classes in your HTML)
document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', event => inputDigit(event.target.textContent));
});
document.querySelector('.decimal').addEventListener('click', inputDecimal);
document.querySelector('.all-clear').addEventListener('click', allClear);
document.querySelector('.clear-entry').addEventListener('click', clearEntry);
document.querySelector('.toggle-sign').addEventListener('click', toggleSign);
document.querySelector('.square-root').addEventListener('click', getSquareRoot);
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', event => handleOperator(event.target.textContent));
});
