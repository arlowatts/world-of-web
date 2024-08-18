import { Element } from "./element.js";

const MESSAGE_WIDTH = 10;
const MESSAGE_HEIGHT = 10;

export class Message extends Element {
    time = 0;

    origin = null;
    parentElement = null;

    success = true;

    constructor(origin) {
        super("Message", 0, 0, -1, -1, false);
        this.type += ".Message";

        this.origin = origin;
        this.parentElement = origin;
    }
}
