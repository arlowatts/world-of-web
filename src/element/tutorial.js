import { Element } from "./element.js";
import { Pane } from "./pane.js";
import { Upgrade } from "./upgrade.js";

const TUTORIAL_WIDTH = 45;
const TUTORIAL_HEIGHT = 45;

export class Tutorial extends Element {
    static INFO = [
        "This is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slide",
        "This is the second slide",
        "This is the third slide",
    ];

    index = 0;

    constructor(x, y) {
        super("Tutorial", x, y, TUTORIAL_WIDTH, TUTORIAL_HEIGHT, false, true);
        this.type += ".Tutorial";

        this.description = Tutorial.INFO[this.index];

        new Upgrade("Previous", this, 0, (level) => 0, (level) => {
            this.index = (this.index - 1 + Tutorial.INFO.length) % Tutorial.INFO.length;
            this.description = Tutorial.INFO[this.index];
        });

        new Upgrade("Next", this, 0, (level) => 0, (level) => {
            this.index = (this.index + 1) % Tutorial.INFO.length;
            this.description = Tutorial.INFO[this.index];
        });

        this.upgrades.forEach((upgrade) => { upgrade.showCost = false; });
    }

    draw(ctx, Styles) {
        ctx.save();

        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        Styles.title(ctx);
        ctx.font = ctx.font.replace("24px", "40px");
        let textMetrics = ctx.measureText("?");
        let textWidth = textMetrics.actualBoundingBoxRight - textMetrics.actualBoundingBoxLeft;
        let textHeight = textMetrics.actualBoundingBoxDescent - textMetrics.actualBoundingBoxAscent;
        ctx.fillText("?", this.x + this.width * 0.5 - textWidth * 0.5, this.y + this.width * 0.5 - textHeight * 0.5);

        ctx.restore();
    }
}
