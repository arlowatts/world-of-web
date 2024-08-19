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
        messages_failed: [0],
        message_time: [0],
    };

    minMessageRate = 0;

    output = null;
    input = null;

    constructor(name, x, y, rate) {
        super(name, x, y, SOURCE_WIDTH, SOURCE_HEIGHT, true, true);
        this.type += ".Source";

        this.minMessageRate = rate;
        this.metrics.message_rate[0] = rate;

        this.output = new Output(this.width * 0.8, this.height, this);
        this.input = new Input(this.width * 0.2, this.height, this);

        this.endpoints.push(this.output);
        this.endpoints.push(this.input);

        new Upgrade("Upgrade message rate", this, 0, (level) => 10, (level) => this.metrics.message_rate[0] += 1 / 1000);

        if (this.metrics.message_rate[0]) {
            this.createMessage();
        }
    }

    // create a new message and send it to the output endpoint
    createMessage() {
        if (this.output) {
            this.output.addMessage(new Message(this));
        }
        else {
            this.metrics.messages_failed[0]++;
        }

        setTimeout(() => this.createMessage(), 1 / this.metrics.message_rate[0]);
    }

    addMessage(message) {
        Element.smooth(this.metrics.message_time, message.time);

        if (message.success) {
            Element.account.add(message.value / message.time);
        }
        else {
            this.metrics.message_rate[0] = Math.max(this.minMessageRate, this.metrics.message_rate[0] - 1 / 10000);
            this.metrics.messages_failed[0]++;
        }

        message.deleted = true;
    }

    updateMetrics() {
        super.updateMetrics();

        this.metrics.messages_failed[0] = 0;
    }

    draw(ctx, Styles) {
        ctx.save();

        // fill and outline the box
        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        Styles.paragraph(ctx);

        let radius = Math.min(this.height, this.height) * 0.375;

        // draw the outer circle
        ctx.beginPath();
        ctx.arc(this.x + this.width * 0.5, this.y + this.height * 0.5, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // draw the inner curve
        ctx.beginPath();
        ctx.ellipse(this.x + this.width * 0.5, this.y + this.height * 0.5, radius * 0.5, radius, 0, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();

        // draw the center vertical line
        ctx.moveTo(this.x + this.width * 0.5, this.y + this.height * 0.5 - radius);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5 + radius);

        // draw the center horizontal line
        ctx.moveTo(this.x + this.width * 0.5 - radius, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.5 + radius, this.y + this.height * 0.5);

        // draw the other horizontal lines
        ctx.moveTo(this.x + this.width * 0.5 - radius * Math.cos(0.5), this.y + this.height * 0.5 - radius * Math.sin(0.5));
        ctx.lineTo(this.x + this.width * 0.5 + radius * Math.cos(0.5), this.y + this.height * 0.5 - radius * Math.sin(0.5));
        ctx.moveTo(this.x + this.width * 0.5 - radius * Math.cos(0.5), this.y + this.height * 0.5 + radius * Math.sin(0.5));
        ctx.lineTo(this.x + this.width * 0.5 + radius * Math.cos(0.5), this.y + this.height * 0.5 + radius * Math.sin(0.5));

        ctx.stroke();

        ctx.restore();
    }
}
