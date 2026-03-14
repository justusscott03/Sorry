import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/math.js";
import { textFont, textAlign, textSize, textWeight, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { UserInput } from "./UserInput.js";
import { gameData } from "../data/GameData.js";

export class NextPhase {
    private static _instance: NextPhase;

    on = false;
    next: "draw" | "move" = "move";
    opac = 0;

    static get Instance() {
        return this._instance ??= new NextPhase();
    }

    trigger(nextPhase: "draw" | "move") {
        if (this.on) return;

        this.next = nextPhase;
        this.on = true;
        this.opac = 0; // reset fade
    }

    readyToAdvance(): boolean {
        return this.on && UserInput.Instance.mouseClicked && this.opac > 45;
    }

    private drawOverlay() {
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
                gameData.turnPhase = this.next;
                this.on = false;
            }
        } 
        else {
            this.opac = lerp(this.opac, 0, 0.1);
        }

        this.drawOverlay();
    }
}

