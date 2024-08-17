import { Endpoint } from "./endpoint.js";

export class Input extends Endpoint {
    constructor(name, offsetX, offsetY, parentElement) {
        super(name, offsetX, offsetY, parentElement);
        this.type += ".Input";
    }

    draw(ctx, Styles) {
        ctx.save();

        // draw the minus sign
        Styles.title(ctx);
        ctx.beginPath();

        ctx.moveTo(this.x + this.width * 0.2, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.5);

        ctx.stroke();

        ctx.restore();
    }
}
