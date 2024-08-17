import { Element } from "./element.js";

const SERVER_WIDTH = 150;
const SERVER_HEIGHT = 100;

export class Server extends Element {
    constructor(name, x, y) {
        super("Server", name, x, y, SERVER_WIDTH, SERVER_HEIGHT, true);
    }
}
