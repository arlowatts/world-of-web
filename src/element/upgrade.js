import { Element } from "./element.js";

const PADDING = 5;
const UPGRADE_HEIGHT = 26;

export class Upgrade extends Element {
    parentElement = null;
    level = 0;

    costFunction = null;
    upgradeFunction = null;

    constructor(name, parentElement, level, costFunction, upgradeFunction) {
        super(name, 0, 0, -1, UPGRADE_HEIGHT, false, false);
        this.type += ".Upgrade";

        parentElement.upgrades.push(this);

        this.parentElement = parentElement;
        this.level = level;

        this.costFunction = costFunction;
        this.upgradeFunction = upgradeFunction;

        this.show = false;
    }

    mouseClick(point) {
        if (Element.account.get() >= this.cost()) {
            Element.account.add(-this.cost());
            this.upgrade();
            this.level++;
        }
    }

    cost() {
        return this.costFunction(this.level);
    }

    upgrade() {
        return this.upgradeFunction(this.level);
    }

    draw(ctx, Styles) {
        ctx.save();

        // measure text to set the width
        Styles.paragraph(ctx);
        let textMetrics = ctx.measureText(this.name + " $" + this.cost());
        this.width = textMetrics.width + 2 * PADDING;

        // fill background
        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // render box outline and text
        Styles.paragraph(ctx);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillText(this.name + " $" + this.cost(), this.x + PADDING, this.y + PADDING);

        ctx.restore();
    }
}
