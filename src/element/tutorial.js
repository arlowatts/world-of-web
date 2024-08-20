import { Element } from "./element.js";
import { Pane } from "./pane.js";
import { Upgrade } from "./upgrade.js";

const TUTORIAL_WIDTH = 45;
const TUTORIAL_HEIGHT = 45;

export class Tutorial extends Element {
    static INFO = [
        "Oh, hey there. You must be the new employee. I heard they hired you to manage our web servers. Let me show you around! \n \n By the way, I'm always here to help if you need me - just click the [?] at the top of the screen. For now, click [Next].",
        "That box with the globe on it is your link to the Internet. The purple orbs are requests for your website. You need to get them to your server, and then get them back to the Internet. \n \n Connect the green line to the server's input (the up arrow).",
        "Nicely done! Now the messages are flowing into the server, but you still need to get them back to the Internet. \n \n Drag a new route from the server's output (the down arrow) to the Internet's input (the up arrow).",
        "Brilliant! Now you're successfully serving web requests from the Internet. This is good, we can do better. \n \n Click on the Internet and click [Upgrade message rate]. Then come back here by clicking the [?] at the top of the screen.",
        "Now the requests are coming in more quickly than before. So quickly that your server is struggling to keep up! \n \n Click on the server and click [Upgrade CPU] to boost it. \n \n Then, when you're ready, I'll show you how to buy new stuff.",
        "See your account balance at the top of the screen? You earn a bit of cash for every request you complete. \n \n You earn more for requests that complete faster or take a more complex path. If a request fails, takes too long, or the path is too simple, the message rate will go down. Let's make this path more interesting now.",
        "Click on your account balance and, from the menu, buy a new server. This one's on me. \n \n Put it wherever you want, then disconnect the routes and rejoin them to the new server. Remember, outputs can only connect to inputs.",
        "Keep upgrading your servers and your message rate to increase your profit. Buy a Database, a Load Balancer, and a Firewall from the account menu and see what they do. \n \n Good luck!",
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
