// Constants that define the canvas
const height = 16;
const width = 16;

// Importing DOM elements
const container = document.querySelector("#container");
container.style.cssText = "display: inline-grid; grid-template-columns: repeat(16, auto); grid-template-rows: repeat(16,auto)"

// Create grid using a nested for loop.
for ( let x = 0; x < width; x++) {
    for ( let y = 0; y < height; y++) {
        const canvas = document.createElement("div");
        // Adding inline style for the grid.
        canvas.classList.add("canvas");
        canvas.style.cssText = "background: gray; border-radius: 5px; width: 35px; height: 35px";
        container.appendChild(canvas);

        canvas.addEventListener("mouseover", (e) => {
            canvas.style.cssText = "background: yellow";
        });
    }
}