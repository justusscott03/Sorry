import { color, noStroke, fill} from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { cursor} from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/other.js";
import { arc, image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { lerp, dist } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
import { textFont, textAlign, textSize, textWeight, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/text.js";
import { pushMatrix, translate, rotate, scale, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
import { user } from "./helpers/ui.js";
import { Card } from "./entities/Card.js";
import { cardData } from "./data/CardData.js";
import { images } from "./lib/ImageLibrary.js";
import { gameData } from "./data/GameData.js";
import { nextPhase } from "./helpers/NextPhase.js";
import { Player } from "./entities/Player.js";
import { spaces } from "./entities/Space.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resetCanvas (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1.0;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 10;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
}


var curLoad = 0;
var loaded = false;
function load () {
    let obj = Object.keys(images);

    resetCanvas(canvas, ctx);
    
    images[obj[curLoad]] = images[obj[curLoad]]();
    
    curLoad++;
    
    if (curLoad >= obj.length) {
        loaded = true;
    }
}

const team1 = [
    new Player(205, 90, 40, "green", 4),
    new Player(245, 90, 40, "green", 4),
    new Player(205, 130, 40, "green", 4),
    new Player(245, 130, 40, "green", 4)
];
const team2 = [
    new Player(710, 205, 40, "red", 19),
    new Player(710, 245, 40, "red", 19),
    new Player(670, 205, 40, "red", 19),
    new Player(670, 245, 40, "red", 19)
];
const team3 = [
    new Player(595, 710, 40, "blue", 34),
    new Player(555, 710, 40, "blue", 34),
    new Player(595, 670, 40, "blue", 34),
    new Player(555, 670, 40, "blue", 34)
];
const team4 = [
    new Player(90, 595, 40, "yellow", 49),
    new Player(90, 555, 40, "yellow", 49),
    new Player(130, 595, 40, "yellow", 49),
    new Player(130, 555, 40, "yellow", 49)
];

const teams = [team1, team2, team3, team4];

const discardDeck = [];
const drawDeck = [];
for (var i = 0; i < cardData.length; i++) {
    for (var j = 0; j < cardData[i].quantity; j++) {
        drawDeck.push(new Card(407, 365, 200, 300, cardData[i]));
    }
}

function shuffleArray (array) {
    var counter = array.length;
    
    while (counter > 0) {
        var ind = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[ind];
        array[ind] = temp;
    }
};

shuffleArray(drawDeck);

class Button {
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
        
        image(images.customCursor, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        
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

const confirm = new Button(200, 200, 75, 75, "Confirm", 15, function () {});
    
function draw () {
    try {
        
    cursor("none");
    
    if (!loaded) {
        load();
    }
    else {
        switch (gameData.scene) {
            case "menu" :
                //image(images.menu, 0, 0);
            break;
            case "game" : 
                image(images.gameBoard, 0, 0);
                
                for (let i in team1) {
                    team1[i].canMove = (gameData.playerTurn === 0 ? true : false);
                    
                    team1[i].draw();
                    if (team1[i].inPlay) {
                        team1[i].move();
                    }
                }
                for (let i in team2) {
                    team2[i].canMove = (gameData.playerTurn === 1 ? true : false);
                    
                    team2[i].draw();
                    if (team2[i].inPlay) {
                        team2[i].move();
                    }
                }
                for (let i in team3) {
                    team3[i].canMove = (gameData.playerTurn === 2 ? true : false);
                    
                    team3[i].draw();
                    if (team3[i].inPlay) {
                        team3[i].move();
                    }
                }
                for (let i in team4) {
                    team4[i].canMove = (gameData.playerTurn === 3 ? true : false);
                    
                    team4[i].draw();
                    if (team4[i].inPlay) {
                        team4[i].move();
                    }
                }
                
                for (let i in  discardDeck) {
                    discardDeck[i].draw();
                }
                for (let i in drawDeck) {
                    drawDeck[i].draw();
                }
                
                let curCard = drawDeck[drawDeck.length - 1];
                
                if (gameData.turnPhase === "draw") {
                    curCard.drawFromDeck();
                }
                
                if (gameData.turnPhase === "move") {
                    
                    if (gameData.selectedPlayer !== null && gameData.selectedPlayer.canMove) {
                        
                        if (gameData.playerTurn === 0) {
                            confirm.x = 325;
                            confirm.y = 110;
                        }
                        else if (gameData.playerTurn === 1) {
                            confirm.x = 690;
                            confirm.y = 325;
                        }
                        else if (gameData.playerTurn === 2) {
                            confirm.x = 475;
                            confirm.y = 690;
                        }
                        else if (gameData.playerTurn === 3) {
                            confirm.x = 110;
                            confirm.y = 475;
                        }
                        
                        confirm.draw();
                    }
                    
                    confirm.func = function () {
                        if (!gameData.action && gameData.selectedPlayer.canMove) {
                            if (!gameData.selectedPlayer.inPlay && curCard.card.value !== 1 && curCard.card.value !== 2) {
                                return;
                            }
                            else {
                                curCard.move(gameData.selectedPlayer);
                                if (spaces[gameData.selectedPlayer.targetSpace].occupied) {
                                    spaces[gameData.selectedPlayer.targetSpace].occupier.dead = true;
                                }
                                gameData.action = true;
                                spaces[gameData.selectedPlayer.curSpace].occupied = false;
                                spaces[gameData.selectedPlayer.curSpace].occupier = null;
                                spaces[gameData.selectedPlayer.targetSpace].occupied = true;
                                spaces[gameData.selectedPlayer.targetSpace].occupier = gameData.selectedPlayer;
                            }
                        }
                    };
                    
                    let allPlayersOutOfPlay = true;

                    for (let p of teams[gameData.playerTurn]) {
                        if (p.inPlay) {
                            allPlayersOutOfPlay = false;
                            break;
                        }
                    }

                    if (allPlayersOutOfPlay && curCard.card.value !== 1 && curCard.card.value !== 2) {
                        gameData.action = true;
                    }
                    
                    if (gameData.action) {
                        gameData.actionTimer++;
                        curCard.discard();
                        if (gameData.actionTimer > 80) {
                            gameData.electedPlayer = null;
                            if (user.mouseClicked) {
                                gameData.actionTimer = 0;
                                gameData.action = false;
                                discardDeck.push(curCard);
                                drawDeck.pop();
                                gameData.playerTurn++;
                                if (gameData.playerTurn > 3) {
                                    gameData.playerTurn = 0;
                                }
                            }
                        }
                    }
                    
                    if (drawDeck.length === 1) {
                        drawDeck = discardDeck;
                        discardDeck = [];
                        shuffleArray(drawDeck);
                    }
                }
                
                gameData.cursorR += 5;
                pushMatrix();
                    translate(user.mouseX, user.mouseY);
                    rotate(gameData.cursorR);
                    scale(0.15);
                    image(images.customCursor, -80, -80);
                popMatrix();
                
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
    
    nextPhase.pack();
    user.update();
    
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

