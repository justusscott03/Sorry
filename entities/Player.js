import { noStroke, noFill, stroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect, image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { lerp, dist } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
import { user } from "../helpers/ui.js";
import { images } from "../lib/ImageLibrary.js";
import { gameData } from "../data/GameData.js";
import { spaces } from "./Space.js";

export class Player {
    constructor(x, y, s, c, startSpace) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.s = s;
        this.c = c;
        this.startSpace = startSpace;
        
        this.inPlay = false;
        this.safe = false;
        this.home = false;
        this.onSlide = false;
        this.canMove = false;
        this.dead = false;
        
        this.curSpace = 0;
        this.targetSpace = startSpace;
    }

    move() {
        this.x = lerp(this.x, spaces[this.targetSpace].x + spaces[this.targetSpace].w / 2, 0.1);
        this.y = lerp(this.y, spaces[this.targetSpace].y + spaces[this.targetSpace].h / 2, 0.1);
        
        
        if (this.targetSpace.occupied) {
            this.targetSpace.occupier.die();
        }
        
        spaces[this.curSpace].occupied = false;
        spaces[this.curSpace].occupier = null;
        spaces[this.targetSpace].occupied = true;
        spaces[this.targetSpace].occupier = this;
        
        if ((this.x + 1 > spaces[this.targetSpace].x + spaces[this.targetSpace].w / 2 && this.x - 1 < spaces[this.targetSpace].x + spaces[this.targetSpace].w / 2) || (this.y + 1 > spaces[this.targetSpace].y + spaces[this.targetSpace].h / 2 && this.y - 1 < spaces[this.targetSpace].y + spaces[this.targetSpace].h / 2)) {
            this.curSpace = this.targetSpace;
        }
    }

    die() {
        this.x = lerp(this.x, this.startX, 0.1);
        this.y = lerp(this.y, this.startY, 0.1);
        this.inPlay = false;
    }

    draw() {
        if (this.dead) {
            this.die();
        }
        
        if (user.mouseClicked && dist(user.mouseX, user.mouseY, this.x, this.y) < this.s / 2 && gameData.turnPhase === "move") {
            gameData.selectedPlayer = this;
        }
        
        noStroke();
        image(images[this.c + "Player"], this.x - this.s / 2, this.y - this.s / 2);
        
        if (gameData.selectedPlayer === this && this.canMove) {
            noFill();
            stroke(255, 0, 0);
            rect(this.x - this.s / 2, this.y - this.s / 2, this.s, this.s);
        }
    }
}