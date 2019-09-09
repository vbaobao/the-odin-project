// FUNCTIONS
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(operator, num1, num2) {
    let result; 
    if (operator == "add") {
        result = add(num1,num2);
    }
    else if (operator == "subtract") {
        result = subtract(num1,num2);
    }
    else if (operator == "multiply") {
        result = multiply(num1,num2);
    }
    else if (operator == "divide") {
        result = divide(num1,num2);
    }
    else {
        console.log("error");
    }
}

function reset() {}

function update(display, text) {
    display.textContent = display.textContent + " " + text;
}

// GET DOMS
let operators = document.querySelectorAll(".operators");
let nums = document.querySelectorAll(".nums");
let equal = document.querySelector("#equal");
let clear = document.querySelector("#clear");
let display = document.querySelector("#display");

// VARIABLES
let operator;
let num;
let text = "";

// EVENT LISTENERS
for (let i = 0 ; i < operators.length ; i++ ) {
    operators[i].addEventListener("click", (e) => {
        if (i == 0) { 
            operator = "add";
            text = "+"; }
        else if (i == 1) {
            operator = "substract";
            text = "-"; }
        else if (i == 2) {
            operator = "multiply";
            text = "*"; }
        else if (i == 3) {
            operator = "divide";
            text = "/";  }
    });

    update(display, text);
}

for (let i = 0 ; i < nums.length ; i++ ) {
    nums[i].addEventListener("click", (e) => {
        num = i;
    });

    update(display, text);
}

equal.addEventListener("click", (e) => {
    text = "=";
    update(display, text);
});

clear.addEventListener("click", (e) => {
    text = "";
    display.textContent = "";
    update(display, text);
});