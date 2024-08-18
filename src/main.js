import { Styles } from "./styles.js";
import { Element } from "./element/element.js";
import { Server } from "./element/server.js";
import { Source } from "./element/source.js";

// initialize the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// create the initial elements
new Server("Flip", 100, 100);
new Server("Flop", 150, 150);
new Source("Users", 100, window.innerHeight / 2, 1000);

// create the event listeners
addEventListener("mousedown", mouseDown);
addEventListener("mouseup", mouseUp);
addEventListener("mousemove", mouseMove);

// kick off the game
render();

// draw the scene and request the next animation frame
function render(now) {
    // draw the background
    drawGrid();

    // draw each element
    for (let i = 0; i < Element.elements.length; i++) {
        if (Element.elements[i].deleted) {
            Element.elements.splice(i, 1);
            i--;
            continue;
        }

        Element.elements[i].draw(ctx, Styles);
    }

    // request the next animation frame
    requestAnimationFrame(render);
}

// find the top element under the mouse pointer and trigger it
function mouseDown(mouseEvent) {
    let element = Element.findUnderPoint(mouseEvent);

    if (element) {
        element.mouseDown(mouseEvent);
    }
}

// trigger the moving element
function mouseUp(mouseEvent) {
    if (Element.movingElement) {
        Element.movingElement.mouseUp(mouseEvent);
    }
}

// if an element is assigned to be moved, move it under the mouse pointer
function mouseMove(mouseEvent) {
    if (Element.movingElement) {
        Element.movingElement.move(mouseEvent.movementX, mouseEvent.movementY);
    }
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
