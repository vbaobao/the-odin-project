// Variables that define the canvas
let height = 16;
let width = 16;
let containerSize = 960;

// Importing DOM elements
const container = document.querySelector("#container");
container.style.cssText = "display: inline-grid; grid-template-columns: repeat("+ width +", auto); grid-template-rows: repeat("+ height +",auto); margin: auto; height "+ containerSize +"px; width: "+ containerSize +"px"

const body = document.querySelector("body");
const reset = document.createElement("button");
body.style.cssText = "display: flex; flex-direction: column"
reset.textContent = "RESET";
reset.style.cssText = "background: #b4e6f5; border: 0; border-radius: 5px; margin: 25px auto";
body.appendChild(reset);

// Create grid using a nested for loop.
for ( let x = 0; x < width; x++) {
    for ( let y = 0; y < height; y++) {
        const canvas = document.createElement("div");
        // Adding inline style for the grid.
        canvas.classList.add("canvas");
        canvas.style.cssText = "background: #373741; height: " + (containerSize/height) + "px";
        container.appendChild(canvas);

        canvas.addEventListener("mouseover", (e) => {
            canvas.style.cssText = "background: #ffe0e0";
        });
    }
}