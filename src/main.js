import { Styles } from "./styles.js";
import { Element } from "./element/element.js";
import { Account } from "./element/account.js";
import { Pane } from "./element/pane.js";
import { Server } from "./element/server.js";
import { Source } from "./element/source.js";
import { Handle } from "./element/handle.js";
import { Route } from "./element/route.js";
import { Tutorial } from "./element/tutorial.js";

// set the standard Pane class
Element.Pane = Pane;

// initialize the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// create the initial elements
new Account("My Account", 85, 20, 50);
new Tutorial(20, 20);
new Server("My Server", 300, 200);

let sourceOutput = new Source("Users", 100, 200, 1 / 800).output;
sourceOutput.mouseDown({ x: sourceOutput.x + 1, y: sourceOutput.y + 1 });
Element.movingElement.x = 150;
Element.movingElement.y = 350;
Element.movingElement = null;

// store the position of the last mouseDown event
let mouseDownPoint = {
    x: 0,
    y: 0,
};

// create the event listeners
addEventListener("mousedown", mouseDown);
addEventListener("mouseup", mouseUp);
addEventListener("mousemove", mouseMove);
addEventListener("click", mouseClick);

// kick off the game
render();

// draw the scene and request the next animation frame
function render(now) {
    // draw the background
    drawGrid();

    // remove moved or deleted elements
    for (let i = 0; i < Element.elements.length; i++) {
        if (Element.elements[i].deleted) {
            Element.elements[i].remove();
            Element.elements.splice(i, 1);
            i--;
            continue;
        }

        if (Element.elements[i].moved.length > 0) {
            Element.elements[i].moved.shift();
            Element.elements.splice(i, 1);
            i--;
            continue;
        }
    }

    // draw other Elements
    for (let i = 0; i < Element.elements.length; i++) {
        if (Element.elements[i].show && Element.elements[i].type !== "Element.Pane" && Element.elements[i].type !== "Element.Upgrade") {
            Element.elements[i].draw(ctx, Styles);
        }
    }

    // draw Routes
    for (let i = 0; i < Element.routes.length; i++) {
        if (Element.routes[i].show) {
            Element.routes[i].draw(ctx, Styles);
        }
    }

    // draw Messages
    for (let i = 0; i < Element.messages.length; i++) {
        if (Element.messages[i].show) {
            Element.messages[i].draw(ctx, Styles);
        }
    }

    // draw the Pane, if it exists
    if (Element.currentPane) {
        Element.currentPane.draw(ctx, Styles);

    // draw the upgrades
    for (let i = 0; i < Element.currentPane.upgrades.length; i++) {
        if (Element.currentPane.upgrades[i].show) {
            Element.currentPane.upgrades[i].draw(ctx, Styles);
        }
    }
    }

    // request the next animation frame
    requestAnimationFrame(render);
}

// find the top element under the mouse pointer and trigger it
function mouseDown(mouseEvent) {
    mouseDownPoint.x = mouseEvent.x;
    mouseDownPoint.y = mouseEvent.y;

    let element = Element.findUnderPoint(mouseEvent);

    if (element) {
        element.mouseDown(mouseEvent);
    }
    else {
        Element.clearPane();
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

// find the top element under the mouse pointer and trigger it
function mouseClick(mouseEvent) {
    if (mouseDownPoint.x === mouseEvent.x && mouseDownPoint.y === mouseEvent.y) {
        let element = Element.findUnderPoint(mouseEvent);

        if (element) {
            element.mouseClick(mouseEvent);
        }
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
