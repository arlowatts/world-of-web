import { Element } from "./element.js";
import { Output } from "./output.js";
import { Input } from "./input.js";
import { Upgrade } from "./upgrade.js";

const SERVER_WIDTH = 150;
const SERVER_HEIGHT = 75;

const FIRST_WORD = ["shy", "glad", "fun", "free", "warm", "good", "best", "blue", "red", "aqua", "teal", "safe"];
const SECOND_WORD = ["dog", "cat", "clam", "tree", "fish", "fly", "frog", "rat", "bird", "wolf", "lion", "bug"];

export class Server extends Element {
    description = "A Server adds value to a request. Each Server adds less value than the previous one in the network.";

    delay = 1200;
    minDelay = 400;
    cpuPerMessage = 40;
    memoryPerMessage = 25;

    metrics = {
        processing_time: [1200],
        cpu: [0],
        memory: [0],
    };

    metricsMeta = {
        processing_time: {
            noPlot: true,
            scale: 0.001,
            suffix: "s",
        },
        cpu: {
            healthyLimit: 100,
            suffix: "%",
        },
        memory: {
            healthyLimit: 100,
            suffix: "%",
        },
    };

    outputs = [];
    inputs = [];

    static serverAudio = new Audio("server.wav");
    audio = null;

    constructor(name, x, y) {
        super(name ? name : Server.randomName(), x, y, SERVER_WIDTH, SERVER_HEIGHT, true, true);
        this.type += ".Server";

        this.outputs.push(new Output(this.width * 0.65, this.height, this));
        this.inputs.push(new Input(this.width * 0.35, this.height, this));

        this.endpoints.push(...this.outputs);
        this.endpoints.push(...this.inputs);

        this.audio = Server.serverAudio;

        new Upgrade("Upgrade processing time", this, 1, (level) => 50 * level, (level) => {
            this.delay = Math.max(this.delay * 0.9, this.minDelay);
            this.metrics.processing_time[0] = this.delay;
        });

        new Upgrade("Upgrade CPU", this, 0, (level) => 25 * 2 ** level, (level) => {
            this.cpuPerMessage *= 0.75;
            
            for (let i = 0; i < this.metrics.cpu.length; i++) {
                this.metrics.cpu[i] *= 0.75;
            }
        });

        new Upgrade("Upgrade memory", this, 1, (level) => 50, (level) => {
            this.memoryPerMessage *= (level + 1) / (level + 2);

            for (let i = 0; i < this.metrics.memory.length; i++) {
                this.metrics.memory[i] *= (level + 1) / (level + 2);
            }
        });
    }

    addMessage(message) {
        this.audio.play();

        if (!this.healthy) {
            message.fail();
            return;
        }

        message.set(this);

        // update metrics
        this.metrics.cpu[0] += this.cpuPerMessage;
        this.metrics.memory[0] += this.memoryPerMessage;

        if (this.metrics.cpu[0] >= 100 || this.metrics.memory[0] >= 100) {
            this.healthy = false;
        }

        message.time += this.delay;
        message.timeNow = Date.now();

        setTimeout(() => {
            let outputsWithRoutes = [];

            this.outputs.forEach((output) => {
                if (output.route) {
                    outputsWithRoutes.push(output);
                }
            });

            if (outputsWithRoutes.length > 0) {
                outputsWithRoutes[Math.floor(Math.random() * outputsWithRoutes.length)].addMessage(message);
            }
            else {
                message.fail();
            }

            this.metrics.cpu[0] -= this.cpuPerMessage;
            this.metrics.memory[0] -= this.memoryPerMessage;

            if (this.metrics.cpu[0] < 100 && this.metrics.memory[0] < 100) {
                this.healthy = true;
            }
        }, this.delay);
    }

    static randomName() {
        return FIRST_WORD[Math.floor(Math.random() * FIRST_WORD.length)] + "-" + SECOND_WORD[Math.floor(Math.random() * SECOND_WORD.length)];
    }
}
