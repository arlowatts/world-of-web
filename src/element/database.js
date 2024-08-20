import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";
import { Server } from "./server.js";

export class Database extends Server {
    delay = 2000;
    cpuPerMessage = 10;
    memoryPerMessage = 20;

    constructor(name, x, y) {
        super(name, x, y);
        this.type += ".Database";
    }
}
