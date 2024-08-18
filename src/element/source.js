import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Message } from "./message.js";

const SOURCE_WIDTH = 50;
const SOURCE_HEIGHT = 50;

const TIME_SMOOTHING = 0.5;

export class Source extends Element {
    metrics = {
        requestFailedCount: 0,
        requestTime: 0,
    };

    rate = 0;

    output = null;
    input = null;

    constructor(name, x, y, rate) {
        super(name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, true, true);
        this.type += ".Source";

        this.rate = rate;

        this.output = new Output(this.width * 0.5, 0, this);
        this.input = new Input(this.width * 0.5, this.height, this);

        this.endpoints.push(this.output);
        this.endpoints.push(this.input);

        if (this.rate > 0) {
            setInterval(() => this.createMessage(), 1 / this.rate);
        }
    }

    // create a new request and send it to the output endpoint
    createMessage() {
        if (this.output) {
            this.output.addMessage(new Message(this));
        }
        else {
            this.metrics.requestFailedCount++;
        }
    }

    addMessage(message) {
        this.metrics.requestTime = TIME_SMOOTHING * message.time + (1 - TIME_SMOOTHING) * this.metrics.requestTime;

        if (!message.success) {
            this.metrics.requestFailedCount++;
        }

        message.deleted = true;
    }
}
