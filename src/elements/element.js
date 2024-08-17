export class Element {
    static elements = [];
    static movingElement = null;

    type = "";
    name = "";

    x = 0;
    y = 0;

    width = 0;
    height = 0;

    moveable = false;

    constructor(type, name, x, y, width, height, moveable) {
        Element.elements.push(this);

        this.type = type;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveable = moveable;
    }

    // draw the element on the given context
    draw(ctx, Styles) {
        ctx.save();

        // fill the background
        Styles.box(ctx);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw the title
        Styles.title(ctx);
        let titleMetrics = ctx.measureText(this.name);
        ctx.fillText(this.name, this.x - titleMetrics.actualBoundingBoxLeft, this.y);

        // draw the subtitle
        Styles.subtitle(ctx);
        let subtitleMetrics = ctx.measureText(this.type);
        ctx.fillText(this.type, this.x - subtitleMetrics.actualBoundingBoxLeft, this.y + titleMetrics.actualBoundingBoxDescent);

        // draw the box
        Styles.box(ctx);
        ctx.beginPath();

        // draw the main outline
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);

        // draw the line under the subtitle
        ctx.moveTo(this.x, this.y - titleMetrics.actualBoundingBoxAscent + titleMetrics.actualBoundingBoxDescent + subtitleMetrics.actualBoundingBoxDescent);
        ctx.lineTo(this.x + this.width, this.y - titleMetrics.actualBoundingBoxAscent + titleMetrics.actualBoundingBoxDescent + subtitleMetrics.actualBoundingBoxDescent);

        ctx.stroke();

        ctx.restore();
    }

    // return true if this Element contains the given point, false otherwise
    containsPoint(point) {
        return point.x > this.x && point.x < this.x + this.width && point.y > this.y && point.y < this.y + this.height;
    }
}
