import { color, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { cursor } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/other.js";
import { image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { textAlign, textSize, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { UserInput } from "./helpers/UserInput.js";
import { gameData } from "./data/GameData.js";
import { ImageManager } from "./helpers/ImageManager.js";
import { ImageLibrary } from "./lib/ImageLibrary.js";
import { DeckManager } from "./helpers/DeckManager.js";
import { TeamsManager } from "./helpers/TeamsManager.js";
import { Cursor } from "./entities/Cursor.js";
import { Button } from "./ui/Button.js";
import { TurnManager } from "./helpers/TurnManager.js";
import { NextPhase } from "./helpers/NextPhase.js";
const confirm = new Button(200, 200, 75, 75, "Confirm", 15, function () { });
const confirmPositions = [
    { x: 325, y: 110 }, // player 0
    { x: 690, y: 325 }, // player 1
    { x: 475, y: 690 }, // player 2
    { x: 110, y: 475 } // player 3
];
UserInput.init();
ImageManager.init(document.getElementById("canvas"));
ImageLibrary.registerImages();
function draw() {
    try {
        if (!ImageManager.Instance.loaded) {
            ImageManager.Instance.loadNext();
        }
        else {
            cursor("none");
            switch (gameData.scene) {
                case "menu":
                    //image(images.menu, 0, 0);
                    break;
                case "game":
                    image(ImageManager.Instance.get("gameBoard"), 0, 0, 800, 800);
                    TeamsManager.Instance.renderTeams();
                    DeckManager.Instance.renderCards();
                    TurnManager.Instance.update();
                    Cursor.draw();
                    textAlign("LEFT", "BASELINE");
                    fill(0);
                    textSize(15);
                    text("Current player: ", 15, 20);
                    gameData.curPlayerTxt = gameData.playerTurn === 0 ? [color(0, 175, 0), "GREEN"] : (gameData.playerTurn === 1 ? [color(200, 0, 0), "RED"] : (gameData.playerTurn === 2 ? [color(0, 130, 255), "BLUE"] : [color(237, 198, 0), "YELLOW"]));
                    fill(gameData.curPlayerTxt[0]);
                    text(gameData.curPlayerTxt[1], 125, 20);
                    break;
            }
        }
        NextPhase.Instance.update();
        UserInput.Instance.update();
        fill(0);
        textSize(15);
        textAlign("LEFT", "BASELINE");
        //outlinedText("FPS: " + ~~this.__frameRate, 10, 785, 2, color(255), color(0));
    }
    catch (e) {
        console.log(e);
    }
    requestAnimationFrame(draw);
}
draw();
//}
