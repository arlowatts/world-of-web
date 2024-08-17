import * as server from "./elements/server.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(0 0 0)";
ctx.strokeStyle = "rgb(100 200 100)";

const elements = [];
elements.push(server.create());

render();

function render(now) {
    drawGrid();

    elements.forEach((element) => {
        element.draw();
    });

    //requestAnimationFrame(render);
}

function drawGrid() {
    // clear the screen
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.beginPath();

    // draw vertical lines
    for (let i = 0; i < window.innerWidth; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, window.innerHeight);
    }

    // draw horizontal lines
    for (let i = 0; i < window.innerHeight; i += 40) {
        ctx.moveTo(0, i);
        ctx.lineTo(window.innerWidth, i);
    }

    ctx.stroke();
}
