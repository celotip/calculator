var num1 = "";
var num2 = "";
var operator = "";
var result = null;

function clear() {
    num1 = "";
    num2 = "";
    operator = "";
    result = null;
}

function add (num1, num2) {
    return Number(num1) + Number(num2);
};

function substract (num1, num2) {
    return Number(num1) - Number(num2);
};

function multiply (num1, num2) {
    return Number(num1) * Number(num2);
};

function divide (num1, num2) {
    return Number(num1) / Number(num2);
};

function operate(operator, num1, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return substract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    }
}

const display = document.querySelector(".display-text");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const displayBox = document.querySelector(".display");

display.style.maxWidth = displayBox.offsetWidth + 'px';

function printall() {
    console.log("num1: ", num1);
    console.log("num2: ", num2);
    console.log("op: ", operator);
    console.log("res: ", result);
}

function blinkDisplay() {
    display.style.visibility = "hidden";
    setTimeout(function() {
        display.style.visibility = "visible";
    }, 100);
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
        if (operator === "=") {
            clear();
            num1 = num1 + numbers[i].innerHTML;
            display.innerHTML = num1;
            printall();
        } else if (!operator) {
            num1 = num1 + numbers[i].innerHTML;
            display.innerHTML = num1;
            printall();
        } else {
            num2 = num2 + numbers[i].innerHTML;
            result = operate(operator, num1, num2);
            display.innerHTML = num2;
            printall();
        }
    });
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function() {
        blinkDisplay();
        if (operator === "/" && Number(num2) === 0) {    
            display.innerHTML = "Error division by zero";
            clear();
        } else {
            if (num1) {
                if (num2) {
                    num2 = "";
                    num1 = result;
                }
                operator = operators[i].innerHTML;
                result === null ? display.innerHTML = num1 : display.innerHTML = result;
                printall();
            }
        }
    });
}

const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
    if (num1 && num2) {
        if (operator === "/" && Number(num2) === 0) {
            blinkDisplay();
            display.innerHTML = "Error division by zero";
            clear();
        } else {
            result = operate(operator, num1, num2);
            num1 = result;
            num2 = "";
            operator = "=";
            blinkDisplay();
            display.innerHTML = result;
        }
        printall();
    }
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    blinkDisplay();
    display.innerHTML = "0";
    clear();
    printall();
});

const dot = document.querySelector(".dot");
dot.addEventListener("click", () => {
    if (num1 && !num2 && !num1.includes(".")) {
        num1 = num1 + ".";
        display.innerHTML = num1;
    } else if (num1 && num2 && !num2.includes(".")) {
        num2 = num2 + ".";
        display.innerHTML = num2;
    }
    printall();
});

const del = document.querySelector(".backspace");
del.addEventListener("click", () => {
    if (num1 && !num2) {
        if (num1.length === 1) {
            num1 = "";
            display.innerHTML = "0";
        } else {
            num1 = num1.slice(0, num1.length - 1)
            display.innerHTML = num1;
        }
    } else if (num1 && num2) {
        if (num2.length === 1) {
            num2 = "";
            display.innerHTML = "0";
        } else {
            num2 = num2.slice(0, num2.length - 1)
            display.innerHTML = num2;
        }
    }
    printall();
});

document.addEventListener("keydown", event => {
    const logkey = event.key;
    if (!isNaN(logkey)) {
        if (!num2 && !operator) {
            num1 = num1 + logkey;
            display.innerHTML = num1;
        } else {
            num2 = num2 + logkey;
            display.innerHTML = num2;
        }
        printall();
    }
})


