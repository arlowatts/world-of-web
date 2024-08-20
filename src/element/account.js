import { Element } from "./element.js";
import { Upgrade } from "./upgrade.js";
import { Server } from "./server.js";

const PADDING = 10;

export class Account extends Element {
    metrics = {
        amount: [0],
    };

    constructor(name, x, y, amount) {
        super(name, x, y, 0, 0, false, true);
        this.type += ".Account";

        this.metrics.amount[0] = amount;

        if (Element.account) {
            Element.account.deleted = true;
            Element.account = null;
        }

        Element.account = this;

        new Upgrade("Buy New Server", this, 0, (level) => 200, (level) => new Server("My Server", 100, 100));
    }

    add(amount) {
        this.metrics.amount[0] += amount;
    }

    get() {
        return this.metrics.amount[0];
    }

    draw(ctx, Styles) {
        ctx.save();

        Styles.title(ctx);

        // determine how to display the amount
        let displayText = (Math.round(this.metrics.amount[0] * 100) / 100).toFixed(2);

        if (displayText.length % 3) {
            displayText = displayText.padStart(displayText.length - displayText.length % 3 + 3, " ");
        }

        displayText = "$ " + displayText;

        // determine the width and height of the box
        let textMetrics = ctx.measureText(displayText);
        this.width = textMetrics.width + PADDING * 2;
        this.height = textMetrics.actualBoundingBoxDescent - textMetrics.actualBoundingBoxAscent + PADDING * 2;

        // draw the box
        Styles.box(ctx);
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // render the text
        Styles.title(ctx);
        ctx.fillText(displayText, this.x + PADDING, this.y + PADDING);

        ctx.restore();
    }
}
