import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";
import { Server } from "./server.js";

export class Database extends Server {
    description = "The Database isn't worth anything on its own, but it adds value to all of the servers that come before it in the network.";

    delay = 2000;
    minDelay = 250;
    cpuPerMessage = 10;
    memoryPerMessage = 20;

    constructor(name, x, y) {
        super(name, x, y);
        this.type += ".Database";

        this.metrics.processing_time[0] = this.delay;
    }
}
