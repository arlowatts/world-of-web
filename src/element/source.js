import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Message } from "./message.js";
import { Upgrade } from "./upgrade.js";

const SOURCE_WIDTH = 50;
const SOURCE_HEIGHT = 50;

const TIME_SMOOTHING = 0.5;

export class Source extends Element {
    metrics = {
        message_rate: [0],
        messages_failed_per_second: [0],
        message_time: [0],
    };

    output = null;
    input = null;

    interval = null;

    constructor(name, x, y, rate) {
        super(name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, true, true);
        this.type += ".Source";

        this.metrics.message_rate[0] = rate;

        this.output = new Output(this.width * 0.5, 0, this);
        this.input = new Input(this.width * 0.5, this.height, this);

        this.endpoints.push(this.output);
        this.endpoints.push(this.input);

        new Upgrade("Upgrade message rate", this, 0, (level) => 10 * 1.5 ** level, (level) => { this.metrics.message_rate[0] *= 1.2; clearInterval(this.interval); this.interval = setInterval(() => this.createMessage(), 1 / this.metrics.message_rate[0]); });

        if (this.metrics.message_rate[0]) {
            this.interval = setInterval(() => this.createMessage(), 1 / this.metrics.message_rate[0]);
        }
    }

    // create a new message and send it to the output endpoint
    createMessage() {
        if (this.output) {
            this.output.addMessage(new Message(this));
        }
        else {
            this.metrics.messages_failed_per_second[0]++;
        }
    }

    addMessage(message) {
        Element.smooth(this.metrics.message_time, message.time);

        if (message.success) {
            Element.account.add(1);
        }
        else {
            this.metrics.messages_failed_per_second[0]++;
        }

        message.deleted = true;
    }

    updateMetrics() {
        super.updateMetrics();

        this.metrics.messages_failed_per_second[0] = 0;
    }
}
