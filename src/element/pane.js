import { Element } from "./element.js";

const PADDING = 20;

const PANE_WIDTH_RATIO = 4;
const PANE_HEIGHT_RATIO = 1;

const PANE_WIDTH = (window.innerWidth - (PANE_WIDTH_RATIO + 1) * PADDING) / PANE_WIDTH_RATIO;
const PANE_HEIGHT = (window.innerHeight - (PANE_HEIGHT_RATIO + 1) * PADDING) / PANE_HEIGHT_RATIO;

export class Pane extends Element {
    static x = PADDING;
    static y = PADDING;

    constructor(parentElement) {
        super(parentElement.name, Pane.x, Pane.y, PANE_WIDTH, PANE_HEIGHT, true, false);
        this.type += ".Pane";

        this.metrics = parentElement.metrics;
    }

    draw(ctx, Styles) {
        super.draw(ctx, Styles);
    }

    move(movementX, movementY) {
        super.move(movementX, movementY);

        Pane.x = this.x;
        Pane.y = this.y;
    }
}
