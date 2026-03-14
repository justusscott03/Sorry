import { noStroke, noFill, stroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { rect, image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { lerp, dist } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/math.js";
import { UserInput } from "../helpers/UserInput.js";
import { gameData } from "../data/GameData.js";
import { spaces } from "./Space.js";
import { ImageManager } from "../helpers/ImageManager.js";
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
        const targetSpace = spaces[this.targetSpace];
        this.x = lerp(this.x, targetSpace.x + targetSpace.w / 2, 0.1);
        this.y = lerp(this.y, targetSpace.y + targetSpace.h / 2, 0.1);
        if (targetSpace.occupied && targetSpace.occupier != this) {
            targetSpace.occupier.die();
        }
        if (Math.abs(this.x - (targetSpace.x + targetSpace.w / 2)) < 1 && Math.abs(this.y - (targetSpace.y + targetSpace.h / 2)) < 1) {
            spaces[this.curSpace].occupied = false;
            spaces[this.curSpace].occupier = null;
            this.curSpace = this.targetSpace;
            spaces[this.curSpace].occupied = true;
            spaces[this.curSpace].occupier = this;
        }
    }
    die() {
        this.x = lerp(this.x, this.startX, 0.1);
        this.y = lerp(this.y, this.startY, 0.1);
        this.inPlay = false;
    }
    draw() {
        const user = UserInput.Instance;
        if (this.dead) {
            this.die();
        }
        if (user.mouseClicked && dist(user.mouseX, user.mouseY, this.x, this.y) < this.s / 2 && gameData.turnPhase === "move") {
            gameData.selectedPlayer = this;
        }
        noStroke();
        image(ImageManager.Instance.get(this.c + "Player"), this.x - this.s / 2, this.y - this.s / 2);
        if (gameData.selectedPlayer === this && this.canMove) {
            console.log(this.inPlay);
            noFill();
            stroke(255, 0, 0);
            rect(this.x - this.s / 2, this.y - this.s / 2, this.s, this.s);
        }
    }
}
