// Variables that define the canvas
let tiles = 16;
let containerSize = 500;

// Importing DOM elements
const container = document.querySelector("#container");
container.style.cssText = "display: inline-grid; grid-template-columns: repeat("+ tiles +", auto); grid-template-rows: repeat("+ tiles +",auto); margin: auto; height "+ containerSize +"px; width: "+ containerSize +"px";

const body = document.querySelector("body");
const reset = document.createElement("button");
body.style.cssText = "display: flex; flex-direction: column"
reset.textContent = "RESET";
reset.style.cssText = "background: #b4e6f5; border: 0; border-radius: 5px; margin: 25px auto";
body.insertBefore(reset, body.childNodes[0]);

// Function to create canvas.
function createCanvas(container, tiles) {
    for ( let x = 0; x < tiles; x++) {
        for ( let y = 0; y < tiles; y++) {
            const canvas = document.createElement("div");
            // Adding inline style for the grid.
            canvas.classList.add("canvas");
            canvas.style.cssText = "background: #373741; height: " + (containerSize/tiles) + "px";
            container.appendChild(canvas);

            canvas.addEventListener("mouseover", (e) => {
                canvas.style.cssText = "background: #ffe0e0";
            });
        }
    }
}

// Function to clear/reset canvas.
function clearCanvas (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
}

// Run canvas.
createCanvas(container, tiles);

// Create reset button functionality
reset.addEventListener("click", (e) => {
    clearCanvas(container);
    tiles = prompt("How many tiles do you want vertically and horizontally?");
    container.style.gridTemplateRows = "repeat("+ tiles +", auto)";
    container.style.gridTemplateColumns = "repeat("+ tiles +", auto)";
    createCanvas(container, tiles);
});