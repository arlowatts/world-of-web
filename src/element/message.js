import { Element } from "./element.js";
import { Route } from "./route.js";

const MESSAGE_RADIUS = 8;

export class Message extends Element {
    time = 0;

    origin = null;
    parentElement = null;

    success = true;

    constructor(origin) {
        super("Message", 0, 0, -1, -1, false);
        this.type += ".Message";

        this.time = Date.now();

        this.origin = origin;
        this.parentElement = origin;
    }

    draw(ctx, Styles) {
        if (this.parentElement.type === "Element.Route") {
            let pointOnRoute = this.parentElement.getPointOnRoute((Date.now() - this.time) / Route.delay);

            if (pointOnRoute) {
                ctx.save();

                // draw the circle
                Styles.message(ctx);
                ctx.beginPath();

                ctx.arc(pointOnRoute.x, pointOnRoute.y, MESSAGE_RADIUS, 0, 2 * Math.PI);

                ctx.fill();

                ctx.restore();
            }
        }
    }

    set(element) {
        this.parentElement = element;
    }

    fail() {
        if (this.origin) {
            this.success = false;
            this.origin.addMessage(this);
        }
        else {
            this.deleted = true;
        }
    }
}
