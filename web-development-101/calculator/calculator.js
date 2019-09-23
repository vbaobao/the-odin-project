//TO DO:
//Delete does not turn on the decimal.
//Delete prints multiple "."

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
    return result;
}

function reset() {
    //Clear variables: build, text, operator
    //Clear HTML: display
    build = [];
    text = "";
    operator = "";
    display.textContent = "";
    display.style.color = "black";
    displayResult.textContent = "";
    container.removeChild(displayResult);

    decimal.classList.remove("off");
    decimal.addEventListener("click", function addDeci(e) {
        //turns off after clicking
        //turns back on once operator is clicked
        build.push(".");
        text = ".";
        update(display, text);
    
        //Turn it off after use
        e.currentTarget.removeEventListener(e.type, addDeci);
        decimal.setAttribute("class", "off");
    });
}

function backspace(display, array) {
    //NOTE: need to add a check to convert "add" to "+" and so on
    let text = array.pop();
    let string = display.textContent;
    if (typeof text == "number") {
        let regex = new RegExp("\\s" + text + "$");
        string = string.replace(regex, "");
        display.textContent = string;
    }
    else if (text == "add") {
        let regex = new RegExp("\\s[+]$");
        string = string.replace(regex, "");
        display.textContent = string;
    }
    else if (text == "subtract") {
        let regex = new RegExp("\\s[-]$");
        string = string.replace(regex, "");
        display.textContent = string;
    }
    else if (text == "multiply") {
        let regex = new RegExp("\\s[*]$");
        string = string.replace(regex, "");
        display.textContent = string;
    }
    else if (text == "divide") {
        let regex = new RegExp("\\s[/]$");
        string = string.replace(regex, "");
        display.textContent = string;
    }
    else if (text == ".") {
        let regex = new RegExp("\\s[.]$");
        string = string.replace(regex, "");
        display.textContent = string;

        decimal.classList.remove("off");
        decimal.addEventListener("click", function addDeci(e) {
            //turns off after clicking
            //turns back on once operator is clicked
            build.push(".");
            text = ".";
            update(display, text);
        
            //Turn it off after use
            e.currentTarget.removeEventListener(e.type, addDeci);
            decimal.setAttribute("class", "off");
        });
    }
}

function update(display, text) {
    //Displays text updates as buttons are pressed
    display.textContent = display.textContent + " " + text;
}

function buildArray (build) {
    //Rebuild array to join digits together
    let array = [];
    let num = [];
    let tempNum;
    for ( let i = 0; i < build.length; i++) {
        if (typeof build[i] == "string") {
            if (build[i] == ".") {
                num.push(build[i]);
            }
            else {
                array.push(build[i]);
            }
        }
        else if (typeof build[i] == "number") {
            if (i+1 == build.length) {
                num.push(build[i]);
                tempNum = parseFloat(num.join(""));
                array.push(tempNum);
                num = [];
            }
            else if (typeof build[i+1] == "number" || build[i+1] == ".") {
                num.push(build[i]);
            }
            else if (typeof build[i+1] == "string" && build[i+1] != ".") {
                num.push(build[i]);
                tempNum = num.join("")
                tempNum = parseFloat(num.join(""));
                array.push(tempNum);
                num = [];
            }
        }
    }
    return array;
}

function isValid (array) {
    //Check if calculation array entries are valid
    //Returns true if array is in [num, string, num] format.
    //Returns false otherwise, ex. ["add", 2, 3]
    for (let i = 0; i < array.length; i++) {
        if ( typeof array[array.length-1] != "number") {
            //If the last element of the array is not a number
            return false;
        }
        else if ( i%2 != 0 ) {
            if ( typeof array[i] != "string" ) {
                //If index is odd and is not a string
                return false;
            }
            else if (array[i] == "divide" && array[i+1] == 0) {
                //if divide by 0
                return false;
            }
        }
        else if ( i == 0 || i%2 == 0 ) {
            if ( typeof array[i] != "number") {
                //If index is 0 or even numbers are not numbers
                return false;
            }
        }
        else {
            return true;
        }
    }
}

// GET DOMS
let operators = document.querySelectorAll(".operators");
let nums = document.querySelectorAll(".nums");
let decimal = document.getElementById("decimal");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let del = document.getElementById("del");
let display = document.getElementById("display");
let container = document.getElementById("container");
let displayResult = document.createElement("div");
displayResult.id = "result";

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

        //Turn decimal point listener on
        decimal.classList.remove("off");
        decimal.addEventListener("click", function addDeci(e) {
            //turns off after clicking
            //turns back on once operator is clicked
            build.push(".");
            text = ".";
            update(display, text);
        
            //Turn it off after use
            e.currentTarget.removeEventListener(e.type, addDeci);
            decimal.setAttribute("class", "off");
        });
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

//Click listener for backspace
del.addEventListener("click", (e) => {
    backspace(display, build);
});

//Click listener for "=" sign
equal.addEventListener("click", (e) => {
    //Concatenates digits into numbers and rebuilds array
    let calcArray = buildArray(build);

    //Checks if the array is valid [num, operator,num] pattern
    let valid = isValid(calcArray);
    if (valid == false) {
        display.style.color = "red";
        display.textContent = "Invalid entry";
    }
    else {
        //Checks for order of operation MDAS, left->right
        //Insert result of operation into the array
        //Remove elements of the array after it is calculated
        let result = 0;
        while (calcArray.length > 1) {
            for (let i = 0; i < calcArray.length; i++) {
                //multiply
                if (calcArray[i] == "multiply") {
                    result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                    calcArray.splice(i+2, 0, result);
                    calcArray.splice(i-1, 3);
                }
            }
            for (let i = 0; i < calcArray.length; i++) {
                //divide + divide by 0 check
                if (calcArray[i] == "divide") {
                    result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                    calcArray.splice(i+2, 0, result);
                    calcArray.splice(i-1, 3);
                }
            }
            for (let i = 0; i < calcArray.length; i++) {
                //add
                if (calcArray[i] == "add") {
                    result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                    calcArray.splice(i+2, 0, result);
                    calcArray.splice(i-1, 3);
                }
            }
            for (let i = 0; i < calcArray.length; i++) {
                //subtract
                if (calcArray[i] == "subtract") {
                    result = operate(calcArray[i], calcArray[i-1], calcArray[i+1]);
                    calcArray.splice(i+2, 0, result);
                    calcArray.splice(i-1, 3);
                }
            }
        }
        //Rounding
        calcArray[0] = Math.round(calcArray[0]*100000)/100000;

         container.prepend(displayResult);
        update(displayResult, calcArray[0]);
    }
});

//Click listener for clearing the display and calculations
clear.addEventListener("click", (e) => {
    reset();
});

//Click listener for "." sign
decimal.addEventListener("click", function addDeci(e) {
    //turns off after clicking
    //turns back on once operator is clicked
    build.push(".");
    text = ".";
    update(display, text);

    //Turn it off after use
    e.currentTarget.removeEventListener(e.type, addDeci);
    decimal.setAttribute("class", "off");
});