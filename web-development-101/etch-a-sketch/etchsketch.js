// Constants that define the canvas
const height = 16;
const width = 16;

// Importing DOM elements
const container = document.querySelector("#container");
const canvas = document.createElement("div");

// Adding inline style for the grid.
canvas.classList.add("canvas");
canvas.style.cssText = "background: gray; border-radius: 10px";

// Create grid using a nested for loop.
for ( let x = 0; x < width; x++) {
    for ( let y = 0; y < height; y++) {
        container.appendChild(canvas);
    }
}
