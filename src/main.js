import { Styles } from "./styles.js";
import { Element } from "./elements/element.js";
import { Server } from "./elements/server.js";

// initialize the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// lists of elements
const elements = [];
let movingElement = null;

// create the initial elements
elements.push(new Server("Flip", 100, 100));
elements.push(new Server("Flop", 150, 150));

addEventListener("mousedown", onMouseDown);
addEventListener("mouseup", onMouseUp);
addEventListener("mousemove", onMouseMove);

// kick off the game
render();

// draw the scene and request the next animation frame
function render(now) {
    drawGrid();

    elements.forEach((element) => {
        element.draw(ctx, Styles);
    });

    requestAnimationFrame(render);
}

// find the front element under the mouse pointer and assign it to be moved
function onMouseDown(mouseEvent) {
    for (let i = elements.length - 1; i >= 0; i--) {
        if (mouseEvent.x > elements[i].x && mouseEvent.x < elements[i].x + elements[i].width &&
            mouseEvent.y > elements[i].y && mouseEvent.y < elements[i].y + elements[i].height) {
            // assign the element as the element to be moved
            movingElement = elements[i];

            // move it to front
            elements.push(elements.splice(i, 1)[0]);

            break;
        }
    }
}

// release the moving element
function onMouseUp(mouseEvent) {
    movingElement = null;
}

// if an element is assigned to be moved, move it under the mouse pointer
function onMouseMove(mouseEvent) {
    if (movingElement) {
        movingElement.x += mouseEvent.movementX;
        movingElement.y += mouseEvent.movementY;
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
