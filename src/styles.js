const BLACK = "#000000";
const GREEN = "#64c864";
const DARK_GREEN = "#326432";
const RED = "#c86464";
const DARK_RED = "#643232";

export class Styles {
    static box(ctx) {
        ctx.fillStyle = BLACK;
        ctx.strokeStyle = DARK_GREEN;
        ctx.lineWidth = 1;
    }

    static title(ctx) {
        ctx.fillStyle = GREEN;
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 4;
        ctx.font = "bold 24px monospace";
        ctx.textBaseline = "top";
    }

    static subtitle(ctx) {
        ctx.fillStyle = DARK_GREEN;
        ctx.strokeStyle = DARK_GREEN;
        ctx.lineWidth = 2;
        ctx.font = "bold 16px monospace";
        ctx.textBaseline = "top";
    }

    static paragraph(ctx) {
        ctx.fillStyle = GREEN;
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 2;
        ctx.font = "16px monospace";
        ctx.textBaseline = "top";
    }

    static message(ctx, value) {
        ctx.fillStyle = `rgb(${value * 200 + 56} ${value * 100 + 28} ${value * 200 + 56})`;
        ctx.strokeStyle = `rgb(${value * 200 + 56} ${value * 100 + 28} ${value * 200 + 56})`;
        ctx.lineWidth = 2;
    }

    static modifyRed(ctx) {
        if (ctx.fillStyle === GREEN) {
            ctx.fillStyle = RED;
        }
        else if (ctx.fillStyle === DARK_GREEN) {
            ctx.fillStyle = DARK_RED;
        }

        if (ctx.strokeStyle === GREEN) {
            ctx.strokeStyle = RED;
        }
        else if (ctx.strokeStyle === DARK_GREEN) {
            ctx.strokeStyle = DARK_RED;
        }
    }
}
