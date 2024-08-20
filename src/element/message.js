import { Element } from "./element.js";
import { Route } from "./route.js";

const MESSAGE_RADIUS = 8;

export class Message extends Element {
    time = 0;
    timeNow = 0;

    origin = null;
    parentElement = null;

    success = true;

    serverCount = 0;
    databaseCount = 0;
    firewallCount = 0;
    value = 0;

    constructor(origin) {
        super("Message", 0, 0, -1, -1, false, false);
        this.type += ".Message";

        this.timeNow = Date.now();

        this.origin = origin;
        this.parentElement = origin;
    }

    draw(ctx, Styles) {
        if (this.parentElement.type === "Element.Route") {
            let pointOnRoute = this.parentElement.getPointOnRoute((Date.now() - this.timeNow) / Route.delay);

            if (pointOnRoute) {
                ctx.save();

                // draw the circle
                Styles.message(ctx, 1 - 1 / (this.value / this.time + 1));
                ctx.beginPath();

                ctx.arc(pointOnRoute.x, pointOnRoute.y, MESSAGE_RADIUS, 0, 2 * Math.PI);

                ctx.fill();
                ctx.stroke();

                ctx.restore();
            }
        }
    }

    set(element) {
        if (this.parentElement.type === "Element.Server") {
            this.serverCount++;
            this.value += 1000 / this.serverCount;
        }
        else if (this.parentElement.type === "Element.Server.Database") {
            this.databaseCount++;
            this.value += 1000 * this.serverCount / this.databaseCount;
        }
        else if (this.parentElement.type === "Element.Server.Firewall") {
            this.firewallCount++;
            this.value += 1000 * this.databaseCount / this.firewallCount ** 2;
        }

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
