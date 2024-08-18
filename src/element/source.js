import { Element } from "./element.js";
import { Input } from "./input.js";
import { Output } from "./output.js";

const SOURCE_WIDTH = 50;
const SOURCE_HEIGHT = 50;

export class Source extends Element {
    rate = 0;

    constructor(name, x, y, rate) {
        super(name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, true);
        this.type += ".Source";

        this.rate = rate;

        this.endpoints.push(new Output("Requests", this.width, 0, this));
        this.endpoints.push(new Input("Responses", this.width, this.height, this));
    }
}
