import { Styles } from "./styles.js";
import { Element } from "./elements/element.js";
import { Server } from "./elements/server.js";

// initialize the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// create the initial elements
const elements = [];
elements.push(new Server("A Server", 100, 100));

render();

// draw the scene and request the next animation frame
function render(now) {
    drawGrid();

    elements.forEach((element) => {
        element.draw(ctx, Styles);
    });

    //requestAnimationFrame(render);
}

// draw the background grid
function drawGrid() {
    ctx.save();

    // fill the background
    Styles.box(ctx);
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.beginPath();

    // draw the vertical lines
    for (let i = 0; i < window.innerWidth; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, window.innerHeight);
    }

    // draw the horizontal lines
    for (let i = 0; i < window.innerHeight; i += 40) {
        ctx.moveTo(0, i);
        ctx.lineTo(window.innerWidth, i);
    }

    ctx.stroke();

    ctx.restore();
}
