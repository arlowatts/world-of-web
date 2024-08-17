import { Element } from "./element.js";

const INPUT_WIDTH = 20;
const INPUT_HEIGHT = 20;

export class Input extends Element {
    constructor(name, offsetX, offsetY, parentElement) {
        super("Input", name, parentElement.x + offsetX, parentElement.y + offsetY, INPUT_WIDTH, INPUT_HEIGHT, false);
    }

    draw(ctx, Styles) {
        ctx.save();

        // fill the background
        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw the minus sign
        Styles.title(ctx);
        ctx.beginPath();

        ctx.moveTo(this.x + this.width * 0.2, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.5);

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
