import { color, background, noStroke, fill, strokeWeight, noFill, stroke, lerpColor } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { get, startMask, endMask } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/other.js";
import { ellipse, arc, rect, triangle } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { round, random } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/math.js";
import { textFont, textAlign, textSize, textWeight, text, outlinedText } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { pushMatrix, translate, rotate, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/transformation.js";
import { spaces } from "../entities/Space.js";
import { ImageManager } from "../helpers/ImageManager.js";
function playerDrawing(color) {
    noStroke();
    fill(color);
    ellipse(20, 20, 40, 40);
    strokeWeight(1);
    stroke(255, 255, 255, 60);
    ellipse(20, 20, 16, 16);
    strokeWeight(3);
    stroke(255, 255, 255, 175);
    arc(20, 20, 40 / 1.3, 40 / 1.3, 180, 270);
    arc(20, 20, 40 / 3, 40 / 3, 180, 270);
    stroke(0, 0, 0, 50);
    arc(20, 20, 40 / 1.3, 40 / 1.3, 0, 90);
    arc(20, 20, 40 / 3, 40 / 3, 0, 90);
    return get(0, 0, 40, 40);
}
export class ImageLibrary {
    static registerImages() {
        const img = ImageManager.Instance;
        img.register("customCursor", () => {
            noStroke();
            fill(255);
            ellipse(80, 80, 160, 160);
            fill(0);
            ellipse(80, 80, 150, 150);
            strokeWeight(10);
            noFill();
            stroke(0, 115, 255);
            arc(80, 80, 130, 130, 200, 225);
            stroke(245, 245, 0);
            arc(80, 80, 130, 130, 225, 315);
            stroke(0, 175, 0);
            arc(80, 80, 130, 130, -45, 45);
            stroke(245, 0, 0);
            arc(80, 80, 130, 130, 45, 135);
            stroke(0, 115, 255);
            arc(80, 80, 130, 130, 135, 200);
            noStroke();
            for (var i = 0; i < 110; i++) {
                var lerpC = lerpColor(color(50), color(150), i / 110);
                fill(lerpC);
                ellipse(80, 80, 110 - i, 110 - i);
            }
            return get(0, 0, 160, 160);
        });
        img.register("gameBoard", () => {
            background(0, 0, 0, 0);
            noStroke();
            for (var i = 0; i < 1000; i++) {
                var lerpC = lerpColor(color(50), color(150), i / 1000);
                fill(lerpC);
                ellipse(400, 400, 1000 - i, 1000 - i);
            }
            fill(0, 0, 0, 50);
            ellipse(225, 110, 130, 130);
            ellipse(690, 225, 130, 130);
            ellipse(575, 690, 130, 130);
            ellipse(110, 575, 130, 130);
            fill(0);
            ellipse(225, 110, 120, 120);
            ellipse(690, 225, 120, 120);
            ellipse(575, 690, 120, 120);
            ellipse(110, 575, 120, 120);
            fill(150, 150, 150);
            rect(0, 0, 800, 57);
            rect(743, 0, 57, 800);
            rect(0, 743, 800, 57);
            rect(0, 0, 57, 800);
            for (let i in spaces) {
                spaces[i].draw();
            }
            // Green circle
            strokeWeight(5);
            stroke(0, 150, 0);
            fill(0, 200, 0);
            ellipse(225, 110, 105, 105);
            strokeWeight(2);
            triangle(225, 65, 240, 80, 210, 80);
            // Red circle
            strokeWeight(5);
            stroke(175, 0, 0);
            fill(225, 0, 0);
            ellipse(690, 225, 105, 105);
            strokeWeight(2);
            triangle(735, 225, 720, 240, 720, 210);
            // Blue circle
            strokeWeight(5);
            stroke(0, 113, 219);
            fill(54, 158, 255);
            ellipse(575, 690, 105, 105);
            strokeWeight(2);
            triangle(575, 735, 560, 720, 590, 720);
            // Blue circle
            strokeWeight(5);
            stroke(255, 191, 0);
            fill(255, 222, 74);
            ellipse(110, 575, 105, 105);
            strokeWeight(2);
            triangle(65, 575, 80, 560, 80, 590);
            textFont("sans-serif");
            textSize(22);
            textWeight("bold");
            textAlign("CENTER", "CENTER");
            pushMatrix();
            translate(225, 110);
            rotate(180);
            outlinedText("START", 0, 0, 1, color(0), color(255));
            outlinedText("START", 110, 575, 1, color(0), color(255));
            popMatrix();
            pushMatrix();
            translate(690, 225);
            rotate(270);
            outlinedText("START", 0, 0, 1, color(0), color(255));
            popMatrix();
            outlinedText("START", 575, 690, 1, color(0), color(255));
            pushMatrix();
            translate(110, 575);
            rotate(90);
            outlinedText("START", 0, 0, 1, color(0), color(255));
            popMatrix();
            textSize(130);
            pushMatrix();
            translate(400, 400);
            rotate(-45);
            outlinedText("SORRY!", 0, 0, 10, color(0), color(255));
            popMatrix();
            stroke(0);
            strokeWeight(7);
            pushMatrix();
            translate(300, 200);
            rotate(45);
            fill(255);
            rect(0, 0, 100, 150, 20);
            fill(0);
            textSize(15);
            text("DISCARD\nHERE", 50, 65);
            textSize(10);
            text("(FACE UP)", 50, 90);
            popMatrix();
            pushMatrix();
            translate(525, 425);
            rotate(45);
            fill(255);
            rect(0, 0, 100, 150, 20);
            rotate(180);
            fill(0);
            textSize(15);
            text("CARDS\nHERE", -50, -80);
            textSize(10);
            text("(FACE DOWN)", -50, -55);
            popMatrix();
            return get(0, 0, 800, 800);
        });
        img.register("cardBackground", () => {
            noStroke();
            fill(255);
            startMask(() => {
                rect(0, 0, 200, 300, 10);
            });
            fill(255);
            rect(0, 0, 200, 300);
            pushMatrix();
            rotate(315);
            fill(0);
            rect(-70, 20, 80, 40, 10);
            ellipse(0, 40, 40, 40);
            arc(-5, 40, 40, 40, 0, 10);
            rect(-85, 290, 80, 40, 10);
            ellipse(-75, 310, 40, 40);
            let rand = round(random(30, 60));
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 10; j++) {
                    fill(175);
                    rect(i * rand - 300, j * 15 + 100, rand, 10, 5);
                    rand = random(30, 60);
                }
            }
            popMatrix();
            endMask();
            return get(0, 0, 200, 300);
        });
        img.register("cardOverlay", () => {
            background(0, 0, 0, 0);
            noStroke();
            fill(255);
            ellipse(80, 80, 160, 160);
            fill(0);
            ellipse(80, 80, 150, 150);
            strokeWeight(10);
            noFill();
            stroke(0, 115, 255);
            arc(80, 80, 130, 130, 200, 225);
            stroke(245, 245, 0);
            arc(80, 80, 130, 130, 225, 315);
            stroke(0, 175, 0);
            arc(80, 80, 130, 130, -45, 45);
            stroke(245, 0, 0);
            arc(80, 80, 130, 130, 45, 135);
            stroke(0, 115, 255);
            arc(80, 80, 130, 130, 135, 200);
            noStroke();
            for (var i = 0; i < 110; i++) {
                var lerpC = lerpColor(color(50), color(150), i / 110);
                fill(lerpC);
                ellipse(80, 80, 110 - i, 110 - i);
            }
            return get(0, 0, 160, 160);
        });
        img.register("cardBack", () => {
            noStroke();
            startMask(() => { rect(0, 0, 200, 300, 10); });
            fill(120);
            rect(0, 0, 200, 300);
            fill(120);
            rect(0, 0, 200, 300);
            pushMatrix();
            rotate(7 * Math.PI / 4);
            popMatrix();
            endMask();
            return get(0, 0, 200, 300);
        });
        img.register("greenPlayer", () => { return playerDrawing(color(0, 175, 0)); });
        img.register("redPlayer", () => { return playerDrawing(color(200, 0, 0)); });
        img.register("bluePlayer", () => { return playerDrawing(color(0, 130, 255)); });
        img.register("yellowPlayer", () => { return playerDrawing(color(237, 198, 0)); });
    }
    ;
}
