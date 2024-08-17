import * as server from "./elements/server.js";

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
    console.log("I'm a grid!");
}
