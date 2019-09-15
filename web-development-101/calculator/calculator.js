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
    //Clear variables: build, text, operator
    //Clear HTML: display
    build = [];
    text = "";
    operator = "";
    display.textContent = "";
}

function update(display, text) {
    //Displays text updates as buttons are pressed
    display.textContent = display.textContent + " " + text;
}

function buildArray (build) {
    //Rebuild array to join digits together
    let array = [];
    let num = [];
    for ( let i = 0; i < build.length; i++) {
        if (typeof build[i] == "string") {
            array.push(build[i]);
        }
        else if (typeof build[i] == "number" && typeof build[i+1] == "number") {
            num.push(build[i]);
        }
        else if (typeof build[i] == "number" && typeof build[i+1] == "string") {
            num.push(build[i]);
            array.push(num.join(""));
            num = [];
        }
        else {
            console.log("Error");
        }
    }
    return array;
}

function isValid (array) {
    //Check if calculation array entries are valid
    //Returns true if array is in [num, string, num] format.
    //Returns false otherwise, ex. ["add", 2, 3]
    for (let i = 0; i < array.length; i++) {
        if ( i == 0 || i%2 == 0 ) {
            if ( typeof array[i] != "number") {
                //If index is 0 or even numbers are not numbers
                return false;
            }
        }
        else if ( i%2 != 0 ) {
            if ( typeof calcArray[i] != "string" ) {
                //If index is odd and is not a string
                return false;
            }
        }
        else if ( typeof calcArray[calcArray.length-1] != "number") {
            //If the last element of the array is not a number
            return false;
        }
    }
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
//Click listener for operators
for (let i = 0 ; i < operators.length ; i++ ) {
    operators[i].addEventListener("click", (e) => {
        if (i == 0) { 
            operator = "add";
            build.push("add");
            text = "+";
        }
        else if (i == 1) {
            operator = "substract";
            build.push("subtract");
            text = "-";
        }
        else if (i == 2) {
            operator = "multiply";
            build.push("multiply");
            text = "*";
        }
        else if (i == 3) {
            operator = "divide";
            build.push("divide");
            text = "/";
        }

        update(display, text);
    });
}

//Click listeners for numbers
for (let i = 0 ; i < nums.length ; i++ ) {
    nums[i].addEventListener("click", (e) => {
        build.push(i);
        text = i;
        update(display, text);
    });
}

//Click listener for "=" sign
equal.addEventListener("click", (e) => {
    //EVERYTHING HAPPENS HERE, AFTER EQUAL IS CLICKED
    //Check numbers
    //Checks if entry is valid. In number/string alternations
    //Checks for order of operations
    //Check division by 0
    //Executes operations for the numbers before and after the op

    //Rebuild array to join digits together
    let calcArray = buildArray(build);

    //Check if entries are valid
    //If not valid show on the display
    if (!isValid(calcArray)) {
        display.style.color = "red";
        display.textContent = "Invalid entry";
    }
    
    //Checks for order of operation MDAS, left->right
    //Insert result of operation into the array
    //Remove elements of the array after it is calculated
    let result = 0;
    while (calcArray.length > 1) {
        for (let i = 0; i < calcArray.length; i++) {
            //multiply
            if (calcArray[i] == "multiply") {
                result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                calcArray = calcArray.splice(i, 0, result);
                calcArray = calcArray.splice(i-1, 3);
            }
        }
        for (let i = 0; i < calcArray.length; i++) {
            //divide + divide by 0 check
            if (calcArray[i] == "divide") {
                if ( calcArray[i+1] == 0 ) {
                    display.textContent = "Divide by 0 Error";
                    calcArray = [];
                }
                result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                calcArray = calcArray.splice(i, 0, result);
                calcArray = calcArray.splice(i-1, 3);
            }
        }
        for (let i = 0; i < calcArray.length; i++) {
            //add
            if (calcArray[i] == "add") {
                result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                calcArray = calcArray.splice(i, 0, result);
                calcArray = calcArray.splice(i-1, 3);
            }
        }
        for (let i = 0; i < calcArray.length; i++) {
            //subtract
            if (calcArray[i] == "subtract") {
                result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                calcArray = calcArray.splice(i, 0, result);
                calcArray = calcArray.splice(i-1, 3);
            }
        }
    }
    //Rounding
    calcArray[0] = Math.round(calcArray[0]*100000)/100000;


    display.textContent = "";
    console.log(calcArray);
    update(display, calcArray[0]);
});

//Click listener for clearing the display and calculations
clear.addEventListener("click", (e) => {
    reset();
});