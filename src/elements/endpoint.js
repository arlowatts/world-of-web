import { Element } from "./element.js";
import { Handle } from "./handle.js";
import { Route } from "./route.js";

const ENDPOINT_WIDTH = 20;
const ENDPOINT_HEIGHT = 20;

export class Endpoint extends Element {
    route = null;

    constructor(name, offsetX, offsetY, parentElement) {
        super(name, parentElement.x + offsetX, parentElement.y + offsetY, ENDPOINT_WIDTH, ENDPOINT_HEIGHT, false);
        this.type += ".Endpoint";
    }

    mouseDown(point) {
        super.mouseDown(point);

        // detach the existing route or create a new one
        if (this.route) {
            if (this.route.endpointA === this) {
                this.route.endpointA = new Handle(point.x, point.y);
            }

            if (this.route.endpointB === this) {
                this.route.endpointB = new Handle(point.x, point.y);
            }

            this.route = null;
        }
        else {
            let handle = new Handle(point.x, point.y);
            this.route = new Route("Route", this, handle);

            Element.movingElement = this.route.endpointB;
        }
    }

    draw(ctx, Styles) {
        ctx.save();

        // fill the background
        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw the box
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
