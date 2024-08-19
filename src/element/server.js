import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";

const SERVER_WIDTH = 150;
const SERVER_HEIGHT = 75;

export class Server extends Element {
    delay = 700;
    cpuPerMessage = 60;
    memoryPerMessage = 30;

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

        this.output = new Output(this.width * 0.65, this.height, this);
        this.inputs.push(new Input(this.width * 0.35, this.height, this));

        this.endpoints.push(this.output);
        this.endpoints.push(...this.inputs);

        new Upgrade("Upgrade processing time", this, 1, (level) => 100 * level, (level) => this.delay *= 0.5);
        new Upgrade("Upgrade CPU", this, 0, (level) => 50 * 2 ** level, (level) => { this.cpuPerMessage *= 0.75; this.metrics.cpu[0] *= 0.75; });
        new Upgrade("Upgrade memory", this, 1, (level) => 100, (level) => { this.memoryPerMessage = 10 / (level + 2); this.metrics.memory[0] *= (level + 2) / (level = 1); });
    }

    addMessage(message) {
        if (this.metrics.cpu[0] >= 100 || this.metrics.memory[0] >= 100) {
            message.fail();
            return;
        }

        message.set(this);

        // update metrics
        Element.smooth(this.metrics.processingTime, this.delay);
        this.metrics.cpu[0] += this.cpuPerMessage;
        this.metrics.memory[0] += this.memoryPerMessage;

        message.time += this.delay;
        message.timeNow = Date.now();

        setTimeout(() => {
            if (this.output) {
                this.output.addMessage(message);
            }
            else {
                message.fail();
            }

            this.metrics.cpu[0] -= this.cpuPerMessage;
            this.metrics.memory[0] -= this.memoryPerMessage;
        }, this.delay);
    }
}
