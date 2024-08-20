import { Element } from "./element.js";

const PADDING = 20;
const PLOT_HEIGHT = 100;

const PANE_WIDTH_RATIO = 4;
const PANE_HEIGHT_RATIO = 1;

const PANE_WIDTH = (window.innerWidth - (PANE_WIDTH_RATIO + 1) * PADDING) / PANE_WIDTH_RATIO;
const PANE_HEIGHT = (window.innerHeight - (PANE_HEIGHT_RATIO + 1) * PADDING) / PANE_HEIGHT_RATIO;

export class Pane extends Element {
    static x = window.innerWidth - PANE_WIDTH - PADDING;
    static y = PADDING;

    parentElement = null;

    constructor(parentElement) {
        super(parentElement.name, Pane.x, Pane.y, PANE_WIDTH, PANE_HEIGHT, true, false);
        this.type += ".Pane";

        this.parentElement = parentElement;

        this.metrics = parentElement.metrics;
        this.metricsMeta = parentElement.metricsMeta;
        this.upgrades = parentElement.upgrades;
    }

    draw(ctx, Styles) {
        let textY = super.draw(ctx, Styles) + PADDING;

        for (let i = 0; i < this.upgrades.length; i++) {
            this.upgrades[i].x = this.x + PADDING;
            this.upgrades[i].y = textY;

            textY += this.upgrades[i].height + PADDING;

            this.upgrades[i].show = true;
            this.upgrades[i].toTop();
        }

        ctx.save();

        if (this.parentElement.description) {
            Styles.paragraph(ctx);

            let lines = [""];
            let descentPerLine = Pane.wrapText(ctx, this.parentElement.description, this.width - 2 * PADDING, lines, 0);

            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], this.x + PADDING, textY);
                textY += descentPerLine;
            }
        }

        Styles.paragraph(ctx);

        // draw the metrics in the pane
        Object.keys(this.metrics).forEach((key) => {
            ctx.fillText(key + ": " + Math.round(this.metrics[key][0] * 1000) / 1000, this.x + PADDING, textY);
            textY += ctx.measureText(key).actualBoundingBoxDescent + PADDING;

            if (!this.metricsMeta[key] || !this.metricsMeta[key].noPlot) {
                this.plot(ctx, Styles, key, this.metrics[key], this.x + PADDING, textY, this.width - 2 * PADDING, PLOT_HEIGHT);
                textY += PLOT_HEIGHT + PADDING;
            }
        });

        if (textY - this.y > this.height) {
            this.height = textY - this.y;
        }

        ctx.restore();

        return textY;
    }

    // plot an array of data
    plot(ctx, Styles, key, data, x, y, width, height) {
        ctx.save();

        let max = 0;

        // determine the maximum value for the plot scale
        for (let i = 0; i < data.length; i++) {
            if (data[i] > max) {
                max = data[i];
            }
        }

        // plot the data
        Styles.paragraph(ctx);
        if (this.metricsMeta[key] && this.metricsMeta[key].healthyLimit && max >= this.metricsMeta[key].healthyLimit) {
            Styles.modifyRed(ctx);
        }

        ctx.beginPath();

        if (max > 0) {
            // move to the first data point
            ctx.moveTo(x + width, y + (1 - data[0] / max) * height);

            // draw a line to the next data point
            for (let i = 1; i < data.length; i++) {
                ctx.lineTo(x + (1 - i / (data.length - 1)) * width, y + (1 - data[i] / max) * height);
            }
        }
        else {
            ctx.moveTo(x + width, y + height);
            ctx.lineTo(x, y + height);
        }

        ctx.stroke();

        ctx.restore();
    }

    move(movementX, movementY) {
        super.move(movementX, movementY);

        Pane.x = this.x;
        Pane.y = this.y;

        this.upgrades.forEach((upgrade) => { upgrade.move(movementX, movementY); });
    }

    remove() {
        this.upgrades.forEach((upgrade) => { upgrade.show = false; });
    }

    updateMetrics() {}

    static wrapText(ctx, text, width, lines, currentLine) {
        let y = 1.5 * Number(ctx.font.match(/\d+/g)[0]);

        let words = text.split(" ");

        for (let i = 0; i < words.length; i++) {
            let textMetrics = ctx.measureText(lines[currentLine] + " " + words[i]);

            if (textMetrics.width <= width) {
                lines[currentLine] += " " + words[i];
            }
            else {
                lines.push(words[i]);
                currentLine++;
            }
        }

        return y;
    }
}
