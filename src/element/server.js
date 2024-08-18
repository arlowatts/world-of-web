import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";

const SERVER_WIDTH = 150;
const SERVER_HEIGHT = 100;

export class Server extends Element {
    constructor(name, x, y) {
        super(name, x, y, SERVER_WIDTH, SERVER_HEIGHT, true);
        this.type += ".Server";

        this.endpoints.push(new Output(this.width * 0.5, 0, this));
        this.endpoints.push(new Input(this.width * 0.5, this.height, this));
    }
}
