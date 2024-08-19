import { Endpoint } from "./endpoint.js";

export class Output extends Endpoint {
    constructor(offsetX, offsetY, parentElement) {
        super(offsetX, offsetY, parentElement);
        this.type += ".Output";
    }

    addMessage(message) {
        message.set(this);

        if (this.route) {
            this.route.addMessage(message);
        }
        else {
            message.fail();
        }
    }

    draw(ctx, Styles) {
        super.draw(ctx, Styles);

        ctx.save();

        // draw the arrow
        Styles.title(ctx);

        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.5, this.y + this.height * 0.8);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.8, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.8);
        ctx.lineTo(this.x + this.width * 0.2, this.y + this.height * 0.5);
        ctx.stroke();

        ctx.restore();
    }
}
