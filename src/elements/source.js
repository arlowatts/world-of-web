import { Element } from "./element.js";

const SOURCE_WIDTH = 50;
const SOURCE_HEIGHT = 50;

export class Source extends Element {
    rate = 0;

    constructor(name, x, y, rate) {
        super("Source", name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, false);
        this.rate = rate;
    }
}
