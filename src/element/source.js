import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Message } from "./message.js";

const SOURCE_WIDTH = 50;
const SOURCE_HEIGHT = 50;

export class Source extends Element {
    failedRequests = 0;

    rate = 0;

    output = null;
    input = null;

    constructor(name, x, y, rate) {
        super(name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, true);
        this.type += ".Source";

        this.rate = rate;

        this.output = new Output(this.width * 0.5, 0, this);
        this.input = new Input(this.width * 0.5, this.height, this);

        this.endpoints.push(this.output);
        this.endpoints.push(this.input);

        setInterval(() => this.createMessage(), this.rate);
    }

    // create a new request and send it to the output endpoint
    createMessage() {
        if (this.output) {
            this.output.addMessage(new Message(this));
        }
        else {
            this.failedRequests++;
        }
    }

    addMessage(message) {
        message.parentElement = this;

        if (!message.success) {
            this.failedRequests++;
        }

        message.deleted = true;
    }
}
