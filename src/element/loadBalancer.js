import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";
import { Server } from "./server.js";

export class LoadBalancer extends Server {
    delay = 100;
    cpuPerMessage = 3;
    memoryPerMessage = 1;

    constructor(name, x, y) {
        super(name, x, y);
        this.type += ".LoadBalancer";

        this.metrics.processing_time[0] = this.delay;

        let newOutput = new Output(this.width * 0.85, this.height, this);
        let newInput = new Input(this.width * 0.15, this.height, this);

        this.outputs.push(newOutput);
        this.inputs.push(newInput);

        this.endpoints.push(newOutput);
        this.endpoints.push(newInput);
    }
}
