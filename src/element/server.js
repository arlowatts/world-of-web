import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";

const SERVER_WIDTH = 150;
const SERVER_HEIGHT = 100;

export class Server extends Element {
    static delay = 500;

    metrics = {
        processingTime: [0],
        cpu: [0],
        memory: [0],
    };

    output = null;
    inputs = [];

    constructor(name, x, y) {
        super(name, x, y, SERVER_WIDTH, SERVER_HEIGHT, true, true);
        this.type += ".Server";

        this.output = new Output(this.width * 0.5, 0, this);
        this.inputs.push(new Input(this.width * 0.5, this.height, this));

        this.endpoints.push(this.output);
        this.endpoints.push(...this.inputs);
    }

    addMessage(message) {
        message.set(this);

        // update metrics
        Element.smooth(this.metrics.processingTime, Server.delay);

        message.time += Server.delay;
        message.timeNow = Date.now();

        setTimeout(() => {
            if (this.output) {
                this.output.addMessage(message);
            }
            else {
                message.fail();
            }
        }, Server.delay);
    }
}
