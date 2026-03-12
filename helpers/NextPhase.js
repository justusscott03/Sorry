import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
import { textFont, textAlign, textSize, textWeight, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { user } from "./ui.js";
import { gameData } from "../data/GameData.js";

export const nextPhase = {
    on : false,
    next : "move",
    opac : 0,
    display : function () {
        noStroke();
        fill(0, 0, 0, this.opac);
        rect(0, 0, 800, 800);
        fill(255, 255, 255, this.opac * 5.1);
        textFont("sans-serif");
        textWeight("bold");
        textSize(70);
        textAlign("CENTER", "CENTER");
        textSize(40);
        text("Continue to " + this.next.toUpperCase() + " phase (click)", 400, 600);
    },
    pack : function () {
        if (this.on) {
            this.opac = lerp(this.opac, 50, 0.1);
            if (user.mouseClicked) {
                gameData.turnPhase = this.next;
                this.on = false;
            }
        }
        else {
            this.opac = lerp(this.opac, 0, 0.1);
        }
        
        this.display();
    }
};
