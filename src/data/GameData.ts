import { color } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
import { Player } from "../entities/Player.js";

type GameData = {
    turnPhase: string;
    playerTurn: number;
    selectedPlayer: Player | null;
    curPlayerTxt: string[];
    scene: string;
};

export const gameData: GameData = {
    turnPhase: "draw",
    playerTurn : 0,
    selectedPlayer : null,
    curPlayerTxt : [color(0, 175, 0), "GREEN"],
    scene : "game",
};