import { Endpoint } from "./endpoint.js";

export class Output extends Endpoint {
    constructor(offsetX, offsetY, parentElement) {
        super(offsetX, offsetY, parentElement);
        this.type += ".Output";
    }

    draw(ctx, Styles) {
        super.draw(ctx, Styles);

        ctx.save();

        // draw the plus sign
        Styles.title(ctx);
        ctx.beginPath();

        ctx.moveTo(this.x + this.width * 0.2, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.5);
        ctx.moveTo(this.x + this.width * 0.5, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.8);

        ctx.stroke();

        ctx.restore();
    }
}
