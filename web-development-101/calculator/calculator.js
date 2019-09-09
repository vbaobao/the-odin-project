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
}

function reset() {}

function showCalc() {}

// GET DOMS
let operators = document.querySelectorAll(".operators");
let nums = document.querySelectorAll(".nums");
let equal = document.querySelector("#equal");
let clear = document.querySelector("#clear");

// VARIABLES
let operator;
let num1;
let num2;

// EVENT LISTENERS
for (let i = 0 ; i < operators.length ; i++ ) {
    operators[i].addEventListener("click", (e) => {
        if (i == 0) { operator = "add"; }
        else if (i == 1) { operator = "substract"; }
        else if (i == 2) { operator = "multiply"; }
        else if (i == 3) { operator = "divide"; }
    });
}

for (let i = 0 ; i < nums.length ; i++ ) {
    nums[i].addEventListener("click", (e) => {
        num = i;
    });
}

equal.addEventListener("click", (e) => {

});

clear.addEventListener("click", (e) => {

});