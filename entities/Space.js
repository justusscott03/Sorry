import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";

class Space {
    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
        this.occupied = false;
        this.occupier = null;
    }

    draw() {
        noStroke();
        fill(240);
        rect(this.x, this.y, this.w, this.h, 10);
    }
}

const spaces = [];
// Top
for (var i = 0; i < 16; i++) {
    spaces.push(new Space(i * 49.5 + 5, 5, 47, 47));
}
// Right side
for (var i = 0; i < 15; i++) {
    spaces.push(new Space(748, i * 49.5 + 54.5, 47, 47));
}
// Bottom
for (var i = 0; i < 15; i++) {
    spaces.push(new Space(697 - i * 49.5, 748, 47, 47));
}
// Left side
for (var i = 0; i < 14; i++) {
    spaces.push(new Space(5, 698 - i * 49.5, 47, 47));
}

export { spaces };