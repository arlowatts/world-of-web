const METRIC_TIME = 1000;
const METRIC_RETENTION = 60;

const TIME_SMOOTHING = 0.5;

export class Element {
    static elements = [];
    static movingElement = null;
    static currentPane = null;
    static account = null;

    static Pane = null;

    deleted = false;
    moved = [];

    type = "Element";
    name = "";

    x = 0;
    y = 0;

    width = 0;
    height = 0;

    moveable = false;
    hasPane = true;

    endpoints = [];

    metrics = {};

    constructor(name, x, y, width, height, moveable, hasPane) {
        Element.elements.push(this);

        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveable = moveable;
        this.hasPane = hasPane;

        setInterval(() => this.updateMetrics(), METRIC_TIME);
    }

    // update this Element's array of metric data for each metric
    updateMetrics() {
        Object.keys(this.metrics).forEach((key) => {
            this.metrics[key].unshift(this.metrics[key][0]);

            if (this.metrics[key].length > METRIC_RETENTION) {
                this.metrics[key].pop();
            }
        });
    }

    addMessage(message) {
        message.set(this);
        message.fail();
    }

    // this method is called when the mouse button is pressed on this element
    mouseDown(point) {
        if (this.moveable) {
            Element.movingElement = this;
        }
    }

    // this method is called when the mouse button is released while this
    // element is the moving element
    mouseUp(point) {
        Element.movingElement = null;
    }

    // this method is called when the mouse button is clicked on this element
    mouseClick(point) {
        this.toTop();

        this.endpoints.forEach((endpoint) => { endpoint.toTop(); });

        if (this.type !== "Element.Pane") {
            Element.clearPane();

            if (this.hasPane) {
                Element.currentPane = new Element.Pane(this);
            }
        }
    }

    // move this element and all attached elements
    move(movementX, movementY) {
        this.toTop();

        this.x += movementX;
        this.y += movementY;

        this.endpoints.forEach((endpoint) => { endpoint.move(movementX, movementY); });
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
        let underlineY = this.y - titleMetrics.actualBoundingBoxAscent + titleMetrics.actualBoundingBoxDescent + subtitleMetrics.actualBoundingBoxDescent;
        ctx.moveTo(this.x, underlineY);
        ctx.lineTo(this.x + this.width, underlineY);

        ctx.stroke();

        ctx.restore();

        return underlineY;
    }

    // return true if this Element touches the given Element, false otherwise
    touchesElement(element) {
        return element.x + element.width > this.x && element.x < this.x + this.width
            && element.y + element.height > this.y && element.y < this.y + this.height;
    }

    // return true if this Element contains the given Element, false otherwise
    containsElement(element) {
        return element.x > this.x && element.x + element.width < this.x + this.width
            && element.y > this.y && element.y + element.height < this.y + this.height;
    }

    // return true if this Element contains the given point, false otherwise
    containsPoint(point) {
        return point.x > this.x && point.x < this.x + this.width
            && point.y > this.y && point.y < this.y + this.height;
    }

    // moves this Element to the top of the display
    toTop() {
        Element.elements.push(this);
        this.moved.push(true);
    }

    // uses exponential smoothing to update the given metric
    static smooth(metric, value) {
        metric[0] = TIME_SMOOTHING * value + (1 - TIME_SMOOTHING) * metric[0];
    }

    // remove the current pane
    static clearPane() {
        if (Element.currentPane) {
            Element.currentPane.deleted = true;
            Element.currentPane = null;
        }
    }

    // return the top element under the given point
    static findUnderPoint(point) {
        for (let i = Element.elements.length - 1; i >= 0; i--) {
            if (Element.elements[i].containsPoint(point)) {
                return Element.elements[i];
            }
        }
    }
}
