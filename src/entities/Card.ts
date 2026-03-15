import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/math.js";
import { textFont, textAlign, textSize, textWeight, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { pushMatrix, translate, rotate, scale, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/transformation.js";
import { ImageLibrary } from "../lib/ImageLibrary.js";
import { gameData } from "../data/GameData.js";
import { NextPhase } from "../helpers/NextPhase.js";
import { CardData } from "../data/CardData.js";
import { Player } from "./Player.js";
import { ImageManager } from "../helpers/ImageManager.js";
import { TurnManager } from "../helpers/TurnManager.js";

export class Card {
    x: number;
    y: number;
    w: number;
    h: number;
    card: CardData;

    r: number;
    scaleX: number;
    scaleY: number;
    drawTimer: number;
    actionTimer: number;
    discardTimer: number;

    constructor(x: number, y: number, w: number, h: number, card: CardData) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.card = card;

        this.r = 45;
        this.scaleX = -1 / 2;
        this.scaleY = 1 / 2;
        this.drawTimer = 0;
        this.actionTimer = 0;
        this.discardTimer = 0;
    }

    drawFromDeck() {
        this.drawTimer++;
        if (this.drawTimer > 80) {
            NextPhase.Instance.trigger("move");
        }
        this.x = lerp(this.x, 300, 0.1);
        this.y = lerp(this.y, 250, 0.1);
        this.scaleX = lerp(this.scaleX, 1, 0.1);
        this.scaleY = lerp(this.scaleY, 1, 0.1);
        this.r = lerp(this.r, 0, 0.1);
    }

    move(curPlayer: Player) {
        this.card.movePlayer(curPlayer);
    }

    discard() {
        this.discardTimer++;
        if (this.discardTimer > 80 && TurnManager.Instance.turnPhase === "move") {
            NextPhase.Instance.trigger("draw");
        }
        this.x = lerp(this.x, 183, 0.1);
        this.y = lerp(this.y, 140, 0.1);
        this.scaleX = lerp(this.scaleX, 1 / 2, 0.1);
        this.scaleY = lerp(this.scaleY, 1 / 2, 0.1);
        this.r = lerp(this.r, 45, 0.1);
    }

    draw() {
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            rotate(this.r);
            scale(this.scaleX, this.scaleY);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            if (this.scaleX > 0) {
                image(ImageManager.Instance.get("cardBackground"), this.x, this.y, this.w, this.h);
                image(ImageManager.Instance.get("cardOverlay"), this.x + this.w / 10, this.y + this.h * 2 / 9, this.w * 4 / 5, this.h * 8 / 15);
                
                fill(255);
                textAlign("CENTER", "CENTER");
                textFont("sans-serif");
                textSize(70);
                textWeight("bold");
                text(this.card.value.toString(), this.x + this.w / 2, this.y + this.h / 2);
                textSize(25);
                text(this.card.value.toString(), this.x + this.w / 8, this.y + this.h / 10);
                text(this.card.value.toString(), this.x + this.w / 1.17, this.y + this.h / 1.12);
                
                fill(0);
                textSize(12);
                textAlign("LEFT", "BASELINE");
                text(this.card.txt, this.x + this.w / 4, this.y + this.h / 15/*, this.w * 3 / 4, this.h*/);
            }
            else {
                image(ImageManager.Instance.get("cardBack"), this.x, this.y, this.w, this.h);
            }
        popMatrix();
    }
}