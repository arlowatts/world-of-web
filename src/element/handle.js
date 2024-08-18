import { Element } from "./element.js";

const HANDLE_WIDTH = 20;
const HANDLE_HEIGHT = 20;

export class Handle extends Element {
    route = null;

    constructor(x, y, route) {
        super("Handle", x - HANDLE_WIDTH * 0.5, y - HANDLE_HEIGHT * 0.5, HANDLE_WIDTH, HANDLE_HEIGHT, true);
        this.type += ".Handle";

        this.route = route;

        Element.movingElement = this;
    }

    mouseUp(mouseEvent) {
        super.mouseUp(mouseEvent);

        // detect if this handle is dropped on an Endpoint and change the route
        if (this.route) {
            for (let i = Element.elements.length - 1; i >= 0; i--) {
                // only attach to unused Endpoints
                if (Element.elements[i].type.startsWith("Element.Endpoint") && !Element.elements[i].route && Element.elements[i].touchesElement(this)) {
                    if (this.route.endpointA === this) {
                        this.route.endpointA = Element.elements[i];
                        Element.elements[i].route = this.route;
                    }

                    if (this.route.endpointB === this) {
                        this.route.endpointB = Element.elements[i];
                        Element.elements[i].route = this.route;
                    }

                    this.deleted = true;
                    break;
                }

                // delete hanging routes
                if (i === 0) {
                    if (this.route.endpointA.type === "Element.Handle" && this.route.endpointB.type === "Element.Handle") {
                        this.route.endpointA.deleted = true;
                        this.route.endpointB.deleted = true;
                        this.route.deleted = true;
                    }
                }
            }
        }
    }

    draw(ctx, Styles) {
        ctx.save();

        // draw and fill the diamond
        Styles.box(ctx);
        ctx.beginPath();

        ctx.moveTo(this.x + this.width * 0.5, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width * 0.5, this.y);

        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }
}
