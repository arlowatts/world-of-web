const BLACK = "rgb(0 0 0)";
const GREEN = "rgb(100 200 100)";
const DARK_GREEN = "rgb(50 100 50)";

export class Styles {
    static box(ctx) {
        ctx.fillStyle = BLACK;
        ctx.strokeStyle = DARK_GREEN;
    }

    static title(ctx) {
        ctx.fillStyle = GREEN;
        ctx.strokeStyle = GREEN;
        ctx.font = "bold 24px monospace";
        ctx.textBaseline = "top";
    }

    static subtitle(ctx) {
        ctx.fillStyle = DARK_GREEN;
        ctx.strokeStyle = DARK_GREEN;
        ctx.font = "bold 16px monospace";
        ctx.textBaseline = "top";
    }

    static paragraph(ctx) {
        ctx.fillStyle = GREEN;
        ctx.strokeStyle = GREEN;
        ctx.font = "16px monospace";
        ctx.textBaseline = "top";
    }
}
