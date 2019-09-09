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
        display.textContent = "Calcualtor error";
    }
}

function reset() {
    //Clear constants: build, text, operator
    //Clear html: display
    build = [];
    text = "";
    operator = "";
    display.textContent = "";
}

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
let operator = "";
let build = [];
let text = "";

// EVENT LISTENERS
for (let i = 0 ; i < operators.length ; i++ ) {
    operators[i].addEventListener("click", (e) => {
        if (i == 0) { 
            operator = "add";
            build.push("add");
            text = "+"; }
        else if (i == 1) {
            operator = "substract";
            build.push("subtract");
            text = "-"; }
        else if (i == 2) {
            operator = "multiply";
            build.push("multiply");
            text = "*"; }
        else if (i == 3) {
            operator = "divide";
            build.push("divide");
            text = "/";  }
    });

    update(display, text);
}

for (let i = 0 ; i < nums.length ; i++ ) {
    nums[i].addEventListener("click", (e) => {
        build.push(i);
    });

    update(display, text);
}

equal.addEventListener("click", (e) => {
    //EVERYTHING HAPPENS HERE, AFTER EQUAL IS CLICKED
    //Checks if entry is valid. In number/string alternations
    //Checks for order of operations
    //Check division by 0
    //Executes operations for the numbers before and after the op
    let result = 0;
    let array = build;

    //Check if entries are valid
    for (let i = 0; i < array.length; i++) {
        if ( i == 0 || i%2 == 0 ) {
            if ( typeof array[i] != "number") {
                display.style.color = "red";
                display.textContent = "Invalid entry";
            }
        }
        else if ( i%2 != 0 ) {
            if ( typeof array[i] != "string" ) {
                display.style.color = "red";
                display.textContent = "Invalid entry";
            }
        }
    }
    
    //Checks for order of operation MDAS, left->right.
    //Insert result of operation into the array.
    //Remove elements of the array after it is calculated.
    while (array.length > 1) {
        for (let i = 0; i < array.length; i++) {
            //multiply
            if (array[i] == "multiply") {
                result = operate(array[i], array[i-1], array[i+1]);
                array = array.splice(i, 0, result);
                array = array.splice(i-1, 3);
            }
        }
        for (let i = 0; i < array.length; i++) {
            //divide
            if (array[i] == "divide") {
                if ( array[i+1] == 0 ) {
                    display.textContent = "Divide by 0 Error";
                    array = [];
                }
                result = operate(array[i], array[i-1], array[i+1]);
                array = array.splice(i, 0, result);
                array = array.splice(i-1, 3);
            }
        }
        for (let i = 0; i < array.length; i++) {
            //add
            if (array[i] == "add") {
                result = operate(array[i], array[i-1], array[i+1]);
                array = array.splice(i, 0, result);
                array = array.splice(i-1, 3);
            }
        }
        for (let i = 0; i < array.length; i++) {
            //subtract
            if (array[i] == "subtract") {
                result = operate(array[i], array[i-1], array[i+1]);
                array = array.splice(i, 0, result);
                array = array.splice(i-1, 3);
            }
        }
    }
    display.textContent = "";
    console.log(array);
    update(display, array[0]);
});

clear.addEventListener("click", (e) => {
    reset();
});