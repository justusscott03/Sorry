import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/math.js";
import { textFont, textAlign, textSize, textWeight, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { UserInput } from "./UserInput.js";
import { TurnManager } from "./TurnManager.js";
export class NextPhase {
    constructor() {
        this.on = false;
        this.next = "move";
        this.opac = 0;
    }
    static get Instance() {
        var _a;
        return (_a = this._instance) !== null && _a !== void 0 ? _a : (this._instance = new NextPhase());
    }
    trigger(nextPhase) {
        if (this.on)
            return;
        this.next = nextPhase;
        this.on = true;
        this.opac = 0; // reset fade
    }
    readyToAdvance() {
        return this.on && UserInput.Instance.mouseClicked && this.opac > 45;
    }
    drawOverlay() {
        noStroke();
        fill(0, 0, 0, this.opac);
        rect(0, 0, 800, 800);
        fill(255, 255, 255, this.opac * 5.1);
        textFont("sans-serif");
        textWeight("bold");
        textSize(40);
        textAlign("CENTER", "CENTER");
        text(`Continue to ${this.next.toUpperCase()} phase (click)`, 400, 600);
    }
    update() {
        if (this.on) {
            this.opac = lerp(this.opac, 50, 0.1);
            if (this.readyToAdvance()) {
                TurnManager.Instance.turnPhase = this.next;
                this.on = false;
            }
        }
        else {
            this.opac = lerp(this.opac, 0, 0.1);
        }
        this.drawOverlay();
    }
}
