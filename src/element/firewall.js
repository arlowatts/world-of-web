import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";
import { Server } from "./server.js";

export class Firewall extends Server {
    description = "The Firewall adds no value on its own, but adds a little bit of value to each subsequent server in the network. Your users like to know they're safe!";

    delay = 100;
    minDelay = 50;
    cpuPerMessage = 1;
    memoryPerMessage = 0;

    constructor(name, x, y) {
        super(name, x, y);
        this.type += ".Firewall";

        this.metrics.processing_time[0] = this.delay;
    }
}
