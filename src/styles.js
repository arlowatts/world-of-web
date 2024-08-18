const BLACK = "rgb(0 0 0)";
const GREEN = "rgb(100 200 100)";
const DARK_GREEN = "rgb(50 100 50)";
const PURPLE = "rgb(200 100 200)";

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

    static message(ctx) {
        ctx.fillStyle = PURPLE;
        ctx.strokeStyle = PURPLE;
        ctx.lineWidth = 2;
    }
}
