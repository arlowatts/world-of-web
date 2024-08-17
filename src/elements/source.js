import { Element } from "./element.js";
import { Input } from "./input.js";
import { Output } from "./output.js";

const SOURCE_WIDTH = 50;
const SOURCE_HEIGHT = 50;

export class Source extends Element {
    rate = 0;

    constructor(name, x, y, rate) {
        super("Source", name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, false);
        this.rate = rate;

        this.inputs.push(new Input("Responses", 40, 40, this));
        this.outputs.push(new Output("Requests", 40, -10, this));
    }
}
