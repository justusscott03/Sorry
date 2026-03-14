import { gameData } from "../data/GameData.js";
import { Button } from "../ui/Button.js";
import { DeckManager } from "./DeckManager.js";
import { NextPhase } from "./NextPhase.js";
import { TeamsManager } from "./TeamsManager.js";
import { UserInput } from "./UserInput.js";
const confirmPositions = [
    { x: 325, y: 110 }, // player 0
    { x: 690, y: 325 }, // player 1
    { x: 475, y: 690 }, // player 2
    { x: 110, y: 475 } // player 3
];
const confirm = new Button(200, 200, 75, 75, "Confirm", 15, function () { });
export class TurnManager {
    constructor() {
        this.isInAction = false;
        this.actionTimer = 0;
    }
    static get Instance() {
        var _a;
        return (_a = this._instance) !== null && _a !== void 0 ? _a : (this._instance = new TurnManager());
    }
    update() {
        const curCard = DeckManager.Instance.drawCard();
        if (gameData.turnPhase === "draw") {
            this.handleDrawPhase(curCard);
        }
        if (gameData.turnPhase === "move") {
            this.handleMovePhase(curCard);
        }
    }
    handleDrawPhase(card) {
        card.drawFromDeck();
        if (NextPhase.Instance.readyToAdvance()) {
            gameData.turnPhase = "move";
        }
    }
    handleMovePhase(card) {
        this.updateConfirmButton(card);
        this.checkAutoAction(card);
        this.processAction(card);
        this.checkReshuffle();
    }
    updateConfirmButton(card) {
        const player = gameData.selectedPlayer;
        if (!player || !player.canMove)
            return;
        const { x, y } = confirmPositions[gameData.playerTurn];
        confirm.x = x;
        confirm.y = y;
        confirm.func = () => {
            if (!this.isInAction && player.canMove) {
                if (!player.inPlay && card.card.value !== 1 && card.card.value !== 2)
                    return;
                card.move(player);
                this.isInAction = true;
            }
        };
        confirm.draw();
    }
    checkAutoAction(card) {
        const team = TeamsManager.Instance.getCurrentTeam(gameData.playerTurn);
        const allOut = !team.some(p => p.inPlay);
        if (allOut && card.card.value !== 1 && card.card.value !== 2) {
            this.isInAction = true;
        }
    }
    processAction(card) {
        if (!this.isInAction)
            return;
        this.actionTimer++;
        card.discard();
        if (this.actionTimer > 80 && UserInput.Instance.mouseClicked) {
            this.actionTimer = 0;
            this.isInAction = false;
            gameData.selectedPlayer = null;
            DeckManager.Instance.discard(card);
            DeckManager.Instance.popCard();
            gameData.playerTurn = (gameData.playerTurn + 1) % 4;
            gameData.turnPhase = "draw";
        }
    }
    checkReshuffle() {
        if (DeckManager.Instance.drawDeck.length === 1) {
            DeckManager.Instance.reshuffle();
        }
    }
}
