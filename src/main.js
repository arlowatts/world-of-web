import { Styles } from "./styles.js";
import { Element } from "./elements/element.js";
import { Server } from "./elements/server.js";
import { Source } from "./elements/source.js";

// initialize the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// create the initial elements
new Server("Flip", 100, 100);
new Server("Flop", 150, 150);
new Source("Users", 100, window.innerHeight / 2);

// create the event listeners
addEventListener("mousedown", onMouseDown);
addEventListener("mouseup", onMouseUp);
addEventListener("mousemove", onMouseMove);

// kick off the game
render();

// draw the scene and request the next animation frame
function render(now) {
    // draw the background
    drawGrid();

    // draw each element
    Element.elements.forEach((element) => {
        element.draw(ctx, Styles);
    });

    // request the next animation frame
    requestAnimationFrame(render);
}

// find the front element under the mouse pointer and assign it to be moved
function onMouseDown(mouseEvent) {
    for (let i = Element.elements.length - 1; i >= 0; i--) {
        if (Element.elements[i].moveable === true && Element.elements[i].containsPoint(mouseEvent)) {
            // assign the element as the element to be moved
            Element.movingElement = Element.elements[i];

            // move it to front
            Element.elements.push(Elementelements.splice(i, 1)[0]);

            break;
        }
    }
}

// release the moving element
function onMouseUp(mouseEvent) {
    Element.movingElement = null;
}

// if an element is assigned to be moved, move it under the mouse pointer
function onMouseMove(mouseEvent) {
    if (Element.movingElement) {
        Element.movingElement.x += mouseEvent.movementX;
        Element.movingElement.y += mouseEvent.movementY;
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
