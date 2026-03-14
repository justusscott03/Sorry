import { Player } from "../entities/Player.js";

interface CardData {
    value: number;
    quantity: number;
    txt: string;
    movePlayer: CallableFunction;
}

const cardData: CardData[] = [
    {
        value : 1,
        quantity : 5,
        txt : "Move a pawn from START or if in play, move forward 1 spaces.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.inPlay) {
                if (curPlayer.targetSpace + this.value > 60) {
                    curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
                }
                else {
                    curPlayer.targetSpace = curPlayer.curSpace + this.value;
                }
            }
            else {
                curPlayer.inPlay = true;
                curPlayer.targetSpace = curPlayer.startSpace;
            }
        }
    },
    {
        value : 2,
        quantity : 4,
        txt : "Move a pawn from START or if in play, move forward 2 spaces.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.inPlay) {
                if (curPlayer.targetSpace + this.value > 60) {
                    curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
                }
                else {
                    curPlayer.targetSpace = curPlayer.curSpace + this.value;
                }
            }
            else {
                curPlayer.targetSpace = curPlayer.startSpace;
                curPlayer.inPlay = true;
            }
        }
    },
    {
        value : 3,
        quantity : 4,
        txt : "Move forward 3.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.targetSpace + this.value > 60) {
                curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
            }
            else {
                curPlayer.targetSpace = curPlayer.curSpace + this.value;
            }
        }
    },
    {
        value : 4,
        quantity : 4,
        txt : "Move backward 4.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.targetSpace - this.value < 0) {
                curPlayer.targetSpace = curPlayer.curSpace - this.value + 60;
            }
            else {
                curPlayer.targetSpace = curPlayer.curSpace - this.value;
            }
        }
    },
    {
        value : 5,
        quantity : 4,
        txt : "Move forward 5.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.targetSpace + this.value > 60) {
                curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
            }
            else {
                curPlayer.targetSpace = curPlayer.curSpace + this.value;
            }
        }
    },
    {
        value : 8,
        quantity : 4,
        txt : "Move forward 8.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.targetSpace + this.value > 60) {
                curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
            }
            else {
                curPlayer.targetSpace = curPlayer.curSpace + this.value;
            }
        }
    },
    {
        value : 12,
        quantity : 4,
        txt : "Move forward 12.",
        movePlayer : function (curPlayer: Player) {
            if (curPlayer.targetSpace + this.value > 60) {
                curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
            }
            else {
                curPlayer.targetSpace = curPlayer.curSpace + this.value;
            }
        }
    }
];

export { CardData, cardData };