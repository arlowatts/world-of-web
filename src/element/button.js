import { Element } from "./element.js";

const PADDING = 10;

export class Button extends Element {
    constructor(name, x, y, height) {
        super(name, x, y, 0, height, false, false);
    }

    mouseClick() {
        Element.routes.forEach((route) => {
            if (route.endpointA.type === "Element.Handle") {
                route.endpointA.deleted = true;
            }
            else {
                route.endpointA.route = null;
            }
            if (route.endpointB.type === "Element.Handle") {
                route.endpointB.deleted = true;
            }
            else {
                route.endpointA.route = null;
            }
            route.deleted = true;
        });
    }

    draw(ctx, Styles) {
        ctx.save();

        Styles.paragraph(ctx);
        let tm = ctx.measureText(this.name);
        this.width = tm.width + PADDING * 2;

        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        Styles.paragraph(ctx);
        ctx.fillText(this.name, this.x + PADDING, this.y + (this.height - tm.actualBoundingBoxDescent + tm.actualBoundingBoxAscent)/ 2);

        ctx.restore();
    }
}
