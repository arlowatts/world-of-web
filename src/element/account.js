import { Element } from "./element.js";
import { Upgrade } from "./upgrade.js";
import { Server } from "./server.js";
import { Database } from "./database.js";
import { LoadBalancer } from "./loadBalancer.js";
import { Firewall } from "./firewall.js";

const PADDING = 10;
const ACCOUNT_HEIGHT = 45;

export class Account extends Element {
    metrics = {
        amount: [0],
    };

    constructor(name, x, y, amount) {
        super(name, x, y, 0, ACCOUNT_HEIGHT, false, true);
        this.type += ".Account";

        this.metrics.amount[0] = amount;

        if (Element.account) {
            Element.account.deleted = true;
            Element.account = null;
        }

        Element.account = this;

        new Upgrade("Server", this, 0, (level) => 100 * level, (level) => new Server(null, 100, 100));
        new Upgrade("Database", this, 0, (level) => 150 + 50 * level, (level) => new Database(null, 100, 100));
        new Upgrade("Load Balancer", this, 0, (level) => 25, (level) => new LoadBalancer(null, 100, 100));
        new Upgrade("Firewall", this, 0, (level) => 500, (level) => new Firewall(null, 100, 100));
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
