import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";

const SERVER_WIDTH = 150;
const SERVER_HEIGHT = 100;

export class Server extends Element {
    static delay = 500;

    cpuPerMessage = 10;
    memoryPerMessage = 5;

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

        new Upgrade("Upgrade CPU", this, 0, (level) => 50 * 2 ** level, (level) => this.cpuPerMessage *= 0.75);
        new Upgrade("Upgrade memory", this, 1, (level) => 100, (level) => this.memoryPerMessage = 10 / (level + 2));
    }

    addMessage(message) {
        message.set(this);

        // update metrics
        Element.smooth(this.metrics.processingTime, Server.delay);
        this.metrics.cpu[0] += this.cpuPerMessage;
        this.metrics.memory[0] += this.memoryPerMessage;

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

    updateMetrics() {
        super.updateMetrics();

        this.metrics.cpu[0] = 0;
        this.metrics.memory[0] = 0;
    }
}
