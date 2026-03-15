import { popMatrix, pushMatrix, rotate, scale, translate } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/transformation.js";
import { UserInput } from "../helpers/UserInput.js";
import { image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { ImageManager } from "../helpers/ImageManager.js";
import { cursor } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/other.js";

export class Cursor {
    static cursorR = 0;

    static draw() {
        Cursor.cursorR += 5;

        cursor("none");

        pushMatrix();
            translate(UserInput.Instance.mouseX, UserInput.Instance.mouseY);
            rotate(Cursor.cursorR);
            scale(0.15);
            image(ImageManager.Instance.get("customCursor"), -80, -80);
        popMatrix();
    }
}