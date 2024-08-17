import { Element } from "./element.js";

const OUTPUT_WIDTH = 20;
const OUTPUT_HEIGHT = 20;

export class Output extends Element {
    constructor(name, offsetX, offsetY, parentElement) {
        super("Output", name, parentElement.x + offsetX, parentElement.y + offsetY, OUTPUT_WIDTH, OUTPUT_HEIGHT, false);
    }

    draw(ctx, Styles) {
        ctx.save();

        // fill the background
        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw the plus sign
        Styles.title(ctx);
        ctx.beginPath();

        ctx.moveTo(this.x + this.width * 0.2, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.5);
        ctx.moveTo(this.x + this.width * 0.5, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.8);

        ctx.stroke();

        // draw the box
        Styles.box(ctx);
        ctx.beginPath();

        // draw the main outline
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);

        ctx.stroke();

        ctx.restore();
    }
}
