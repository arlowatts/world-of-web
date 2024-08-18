import { Element } from "./element.js";

export class Route extends Element {
    endpointA = null;
    endpointB = null;

    constructor(endpointA, endpointB) {
        super("Route", 0, 0, -1, -1, false);
        this.type += ".Route";

        this.endpointA = endpointA;
        this.endpointB = endpointB;
    }

    addMessage(message) {
        let previousElement = message.parentElement;
        message.set(this);

        if (this.endpointA.type === this.endpointB.type) {
            message.fail();
        }
        else if (this.endpointA === previousElement && this.endpointB) {
            this.endpointB.addMessage(message);
        }
        else if (this.endpointB === previousElement && this.endpointA) {
            this.endpointA.addMessage(message);
        }
        else {
            message.fail();
        }
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
