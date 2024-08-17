import { Element } from "./element.js";

const HANDLE_WIDTH = 20;
const HANDLE_HEIGHT = 20;

export class Handle extends Element {
    constructor(name, x, y) {
        super(name, x, y, HANDLE_WIDTH, HANDLE_HEIGHT, true);
        this.type += ".Handle";

        Element.movingElement = this;
    }

    draw(ctx, Styles) {
        ctx.save();

        // draw the diamond
        Styles.box(ctx);
        ctx.beginPath();

        ctx.moveTo(this.x + this.width * 0.5, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.5, this.y);

        ctx.stroke();

        ctx.restore();
    }
}
