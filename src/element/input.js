import { Endpoint } from "./endpoint.js";

export class Input extends Endpoint {
    constructor(offsetX, offsetY, parentElement) {
        super(offsetX, offsetY, parentElement);
        this.type += ".Input";
    }

    addMessage(message) {
        this.parentElement.addMessage(message);
    }

    draw(ctx, Styles) {
        super.draw(ctx, Styles);

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
