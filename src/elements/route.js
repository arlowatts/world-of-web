import { Element } from "./element.js";

export class Route extends Element {
    endpointA = null;
    endpointB = null;

    constructor(name, endpointA, endpointB) {
        super(name, 0, 0, -1, -1, false);
        this.type += ".Route";

        this.endpointA = endpointA;
        this.endpointB = endpointB;
    }

    draw(ctx, Styles) {
        ctx.save();

        // draw a line from endpoint A to endpoint B
        Styles.title(ctx);
        ctx.beginPath();

        ctx.moveTo(this.endpointA.x + this.endpointA.width * 0.5, this.endpointA.y + this.endpointA.height * 0.5);
        ctx.lineTo(this.endpointB.x + this.endpointB.width * 0.5, this.endpointB.y + this.endpointB.height * 0.5);

        ctx.stroke();

        ctx.restore();
    }
}
