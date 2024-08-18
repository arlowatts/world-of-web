import { Element } from "./element.js";

export class Route extends Element {
    static delay = 300;

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

        message.time = Date.now();

        setTimeout(() => {
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
        }, Route.delay);
    }

    getPointOnRoute(t) {
        let aX = this.endpointA.x + this.endpointA.width * 0.5;
        let aY = this.endpointA.y + this.endpointA.height * 0.5;
        let bX = this.endpointB.x + this.endpointB.width * 0.5;
        let bY = this.endpointB.y + this.endpointB.height * 0.5;

        if (this.endpointA.type === "Element.Endpoint.Output" && this.endpointB.type === "Element.Endpoint.Input") {
            return {
                x: aX + t * (bX - aX),
                y: aY + t * (bY - aY),
            };
        }
        else if (this.endpointA.type === "Element.Endpoint.Input" && this.endpointB.type === "Element.Endpoint.Output") {
            return {
                x: bX + t * (aX - bX),
                y: bY + t * (aY - bY),
            };
        }
        else {
            return null;
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
