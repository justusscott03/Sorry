import { fill} from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/shapes.js";
import { textAlign, textSize, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { UserInput } from "./helpers/UserInput.js";
import { ImageManager } from "./helpers/ImageManager.js";
import { ImageLibrary } from "./lib/ImageLibrary.js";
import { DeckManager } from "./helpers/DeckManager.js";
import { TeamsManager } from "./helpers/TeamsManager.js";
import { Cursor } from "./entities/Cursor.js";
import { TurnManager } from "./helpers/TurnManager.js";
import { NextPhase } from "./helpers/NextPhase.js";
import { SceneManager } from "./helpers/SceneManager.js";


UserInput.init();
ImageManager.init(document.getElementById("canvas") as HTMLCanvasElement);
ImageLibrary.registerImages();

SceneManager.Instance.registerScene("load", () => {
    if (!ImageManager.Instance.loaded) {
        ImageManager.Instance.loadNext();
    }
});
SceneManager.Instance.registerScene("menu", () => {
    //image(images.menu, 0, 0);
});
SceneManager.Instance.registerScene("game", () => {
    image(ImageManager.Instance.get("gameBoard"), 0, 0, 800, 800);
    TeamsManager.Instance.renderTeams();
    DeckManager.Instance.renderCards();
    TurnManager.Instance.update();
    
    Cursor.draw();
    
    textAlign("LEFT", "BASELINE");
    fill(0);
    textSize(15);
    text("Current player: ", 15, 20);
    const curPlayerTxt = TeamsManager.teamColorPairs[TurnManager.Instance.playerTurn];
    fill(curPlayerTxt[0]);
    text(curPlayerTxt[1], 125, 20);
})

function draw () {
    try {
        SceneManager.Instance.renderCurrentScene();
        NextPhase.Instance.update();
        UserInput.Instance.update();
    }
    catch (e) {
        console.log(e);
    }

    requestAnimationFrame(draw);
}

draw();

//}

            