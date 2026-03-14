import { dist, lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/math.js";
import { UserInput } from "../helpers/UserInput.js";
import { fill, noStroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { arc, image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { ImageManager } from "../helpers/ImageManager.js";
import { text, textAlign, textFont, textSize, textWeight } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
export class Button {
    constructor(x, y, w, h, txt, txtSize, func) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.txtSize = txtSize;
        this.func = func;
        this.mouseOver = false;
        this.arc = 180;
    }
    draw() {
        const user = UserInput.Instance;
        this.mouseOver = dist(user.mouseX, user.mouseY, this.x, this.y) < this.w / 2;
        if (this.mouseOver) {
            this.arc = lerp(this.arc, 0, 0.1);
            if (user.mouseClicked) {
                this.func();
            }
        }
        else {
            this.arc = lerp(this.arc, 180, 0.1);
        }
        noStroke();
        image(ImageManager.Instance.get("customCursor"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        fill(0);
        textFont("sans-serif");
        textWeight("bold");
        textSize(this.txtSize);
        textAlign("CENTER", "CENTER");
        text(this.txt, this.x, this.y);
        fill(0, 0, 0, 30);
        arc(this.x, this.y, this.w, this.h, 0, this.arc);
        arc(this.x, this.y, this.w, this.h, 180, 180 + this.arc);
    }
}
