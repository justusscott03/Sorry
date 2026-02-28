/*

I have an absolute TON of incomplete projects! I basically would start a project, think of something else that would be cool to make, and start that! That went on for a while until I commited to a larger project. That also started dying, so I moved to development with Unreal Engine and Unity. Operation project dump is where I'm dumping my incomplete projects and will hopefully eventually finish them.

This one got quite a bit farther than I thought hit would (given my history). It's not bad to play, but there a quite few missing mechanics. I was actually pretty pleased with the graphics in this one. If you want to actually try the game, add this (?width=800&height=800) to the link to this page, or go to this link (https://www.khanacademy.org/computer-programming/operation-project-dump-sorry/5695312448045056?width=800&height=800)

*/

/** Global variables **/
// {

var clicked = false;
var turnPhase = "draw";
var playerTurn = 0;
var selectedPlayer = null;
var cursorR = 0;
var action = false;
var actionTimer = 0;
var curPlayerTxt = [color(0, 175, 0), "GREEN"];
var scene = "game";

//}

/** Turn phase transition **/
// {

var nextPhase = {
    on : false,
    next : "move",
    opac : 0,
    display : function () {
        noStroke();
        fill(0, 0, 0, this.opac);
        rect(0, 0, 800, 800);
        fill(255, 255, 255, this.opac * 5.1);
        textFont(createFont("Sans Serif Bold"));
        textAlign(CENTER, CENTER);
        textSize(40);
        text("Continue to " + this.next.toUpperCase() + " phase (click)", 400, 600);
    },
    pack : function () {
        if (this.on) {
            this.opac = lerp(this.opac, 50, 0.1);
            if (clicked) {
                turnPhase = this.next;
                this.on = false;
            }
        }
        else {
            this.opac = lerp(this.opac, 0, 0.1);
        }
        
        this.display();
    }
};

//}

/** Outlined text, credit to A Random Coder (@ARandomCoder123) **/
// {

var outlinedText = function (txt, x, y, weight, main, outline, inc) {
    inc = inc || 10;
    fill(outline);
    for (var i = 0; i < 360; i += inc) {
        text(txt, x + sin(i) * weight, y + cos(i) * weight);
    }
    fill(main);
    text(txt, x, y);
};

//}

/** Space **/
// {

var Space = function (x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.occupied = false;
    this.occupier = null;
};
Space.prototype.draw = function () {
    noStroke();
    fill(240);
    rect(this.x, this.y, this.w, this.h, 10);
};
    
var spaces = [];
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

//}

/** Images **/
// {

var images = {
    customCursor : function () {
        
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
        
    },
    gameBoard : function () {
        
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
        
        for (var i in spaces) {
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
        
        textFont(createFont("Sans Serif Bold"));
        textAlign(CENTER, CENTER);
        textSize(22);
        
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
        
    },
    cardBackground : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(255);
        rect(0, 0, 200, 300, 10);
        
        var msk = createGraphics(width, height, P2D);
        
        msk.background(0, 0, 0, 0);
        
        msk.rect(5, 7.5, 190, 285);
        
        msk = msk.get();
        
        var bkg = createGraphics(width, height, P2D);
        
        bkg.noStroke();
        
        bkg.fill(255);
        bkg.rect(0, 0, 200, 300);
        
        pushMatrix();
            
            bkg.rotate(7 * PI / 4);
            
            bkg.fill(0);
            bkg.rect(-70, 20, 80, 40, 50);
            bkg.ellipse(-5, 40, 40, 40);
            
            bkg.rect(-70, 20, 80, 40, 50);
            bkg.arc(-5, 40, 40, 40, 0, 10);
            
            bkg.rect(-85, 290, 80, 40, 50);
            bkg.ellipse(-70, 310, 40, 40);
            
            var rand = round(random(30, 60));
            
            for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 10; j++) {
                    bkg.fill(175);
                    bkg.rect(i * rand - 300, j * 15 + 100, rand, 10, 50);
                    rand = random(30, 60);
                }
            }
            
        popMatrix();
        
        bkg = bkg.get();
        
        bkg.mask(msk);
        
        image(bkg, 0, 0);
        
        return get(0, 0, 200, 300);
        
    },
    cardOverlay : function () {
        
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
        
    },
    cardBack : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(120);
        rect(0, 0, 200, 300, 10);
        
        var msk = createGraphics(width, height, P2D);
        
        msk.background(0, 0, 0, 0);
        
        msk.rect(5, 7.5, 190, 285);
        
        msk = msk.get();
        
        var bkg = createGraphics(width, height, P2D);
        
        bkg.noStroke();
        
        bkg.fill(120);
        bkg.rect(0, 0, 200, 300);
        
        pushMatrix();
            
            bkg.rotate(7 * PI / 4);
            
            
            
        popMatrix();
        
        bkg = bkg.get();
        
        bkg.mask(msk);
        
        image(bkg, 0, 0);
        
        return get(0, 0, 200, 300);
        
    },
    greenPlayer : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(0, 175, 0);
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
        
    },
    redPlayer : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(200, 0, 0);
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
        
    },
    bluePlayer : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(0, 130, 255);
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
        
    },
    yellowPlayer : function () {
        
        background(0, 0, 0, 0);
        
        noStroke();
        
        fill(237, 198, 0);
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
};

var curLoad = 0;
var loaded = false;
var load = function () {
    var obj = Object.keys(images);
    
    images[obj[curLoad]] = images[obj[curLoad]]();
    
    curLoad++;
    
    if (curLoad >= Object.keys(images).length) {
        loaded = true;
    }
};

//}

/** Player **/
// {

var Player = function (x, y, s, c, startSpace) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.s = s;
    this.c = c;
    this.startSpace = startSpace;
    
    this.inPlay = false;
    this.safe = false;
    this.home = false;
    this.onSlide = false;
    this.canMove = false;
    this.dead = false;
    
    this.curSpace = 0;
    this.targetSpace = startSpace;
};
Player.prototype.move = function () {
    this.x = lerp(this.x, spaces[this.targetSpace].x + spaces[this.targetSpace].w / 2, 0.1);
    this.y = lerp(this.y, spaces[this.targetSpace].y + spaces[this.targetSpace].h / 2, 0.1);
    
    
    if (this.targetSpace.occupied) {
        this.targetSpace.occupier.die();
    }
    
    spaces[this.curSpace].occupied = false;
    spaces[this.curSpace].occupier = null;
    spaces[this.targetSpace].occupied = true;
    spaces[this.targetSpace].occupier = this;
    
    if ((this.x + 1 > spaces[this.targetSpace].x + spaces[this.targetSpace].w / 2 && this.x - 1 < spaces[this.targetSpace].x + spaces[this.targetSpace].w / 2) || (this.y + 1 > spaces[this.targetSpace].y + spaces[this.targetSpace].h / 2 && this.y - 1 < spaces[this.targetSpace].y + spaces[this.targetSpace].h / 2)) {
        this.curSpace = this.targetSpace;
    }
};
Player.prototype.die = function () {
    this.x = lerp(this.x, this.startX, 0.1);
    this.y = lerp(this.y, this.startY, 0.1);
    this.inPlay = false;
};
Player.prototype.draw = function () {
    if (this.dead) {
        this.die();
    }
    
    if (clicked && dist(mouseX, mouseY, this.x, this.y) < this.s / 2 && turnPhase === "move") {
        selectedPlayer = this;
    }
    
    noStroke();
    image(images[this.c + "Player"], this.x - this.s / 2, this.y - this.s / 2);
    
    if (selectedPlayer === this && this.canMove) {
        noFill();
        stroke(255, 0, 0);
        rect(this.x - this.s / 2, this.y - this.s / 2, this.s, this.s);
    }
};

var team1 = [
    new Player(205, 90, 40, "green", 4),
    new Player(245, 90, 40, "green", 4),
    new Player(205, 130, 40, "green", 4),
    new Player(245, 130, 40, "green", 4)
];
var team2 = [
    new Player(710, 205, 40, "red", 19),
    new Player(710, 245, 40, "red", 19),
    new Player(670, 205, 40, "red", 19),
    new Player(670, 245, 40, "red", 19)
];
var team3 = [
    new Player(595, 710, 40, "blue", 34),
    new Player(555, 710, 40, "blue", 34),
    new Player(595, 670, 40, "blue", 34),
    new Player(555, 670, 40, "blue", 34)
];
var team4 = [
    new Player(90, 595, 40, "yellow", 49),
    new Player(90, 555, 40, "yellow", 49),
    new Player(130, 595, 40, "yellow", 49),
    new Player(130, 555, 40, "yellow", 49)
];

var teams = [team1, team2, team3, team4];

//}

/** Cards array **/
// {

var cards = [
    {
        value : 1,
        quantity : 5,
        txt : "Move a pawn from START or if in play, move forward 1 spaces.",
        movePlayer : function (curPlayer) {
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
        value : 2,
        quantity : 4,
        txt : "Move a pawn from START or if in play, move forward 2 spaces.",
        movePlayer : function (curPlayer) {
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
        movePlayer : function (curPlayer) {
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
        movePlayer : function (curPlayer) {
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
        movePlayer : function (curPlayer) {
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
        movePlayer : function (curPlayer) {
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
        movePlayer : function (curPlayer) {
            if (curPlayer.targetSpace + this.value > 60) {
                curPlayer.targetSpace = curPlayer.curSpace + this.value - 60;
            }
            else {
                curPlayer.targetSpace = curPlayer.curSpace + this.value;
            }
        }
    }
];

//}

/** Card **/
// {

var Card = function (x, y, w, h, card) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = 45;
    this.scaleX = -1 / 2;
    this.scaleY = 1 / 2;
    this.card = card;
    this.drawTimer = 0;
    this.actionTimer = 0;
    this.discardTimer = 0;
};
Card.prototype.drawFromDeck = function () {
    this.drawTimer++;
    if (this.drawTimer > 80) {
        nextPhase.next = "move";
        nextPhase.on = true;
    }
    this.x = lerp(this.x, 300, 0.1);
    this.y = lerp(this.y, 250, 0.1);
    this.scaleX = lerp(this.scaleX, 1, 0.1);
    this.scaleY = lerp(this.scaleY, 1, 0.1);
    this.r = lerp(this.r, 0, 0.1);
};
Card.prototype.move = function (curPlayer) {
    this.card.movePlayer(curPlayer);
};
Card.prototype.discard = function () {
    this.discardTimer++;
    if (this.discardTimer > 80 && turnPhase === "move") {
        nextPhase.next = "draw";
        nextPhase.on = true;
    }
    this.x = lerp(this.x, 183, 0.1);
    this.y = lerp(this.y, 140, 0.1);
    this.scaleX = lerp(this.scaleX, 1 / 2, 0.1);
    this.scaleY = lerp(this.scaleY, 1 / 2, 0.1);
    this.r = lerp(this.r, 45, 0.1);
};
Card.prototype.draw = function () {
    pushMatrix();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        rotate(this.r);
        scale(this.scaleX, this.scaleY);
        translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
        if (this.scaleX > 0) {
            image(images.cardBackground, this.x, this.y, this.w, this.h);
            image(images.cardOverlay, this.x + this.w / 10, this.y + this.h * 2 / 9, this.w * 4 / 5, this.h * 8 / 15);
            
            fill(255);
            textFont(createFont("Sans Serif Bold"));
            textAlign(CENTER, CENTER);
            textSize(70);
            text(this.card.value, this.x + this.w / 2, this.y + this.h / 2);
            textSize(25);
            text(this.card.value, this.x + this.w / 8, this.y + this.h / 10);
            text(this.card.value, this.x + this.w / 1.17, this.y + this.h / 1.12);
            
            fill(0);
            textSize(12);
            textAlign(LEFT, BASELINE);
            text(this.card.txt, this.x + this.w / 4, this.y + this.h / 15, this.w * 3 / 4, this.h);
        }
        else {
            image(images.cardBack, this.x, this.y, this.w, this.h);
        }
    popMatrix();
};

//}

/** Create the deck **/
// {

var discardDeck = [];
var drawDeck = [];
for (var i = 0; i < cards.length; i++) {
    for (var j = 0; j < cards[i].quantity; j++) {
        drawDeck.push(new Card(407, 365, 200, 300, cards[i]));
    }
}

var shuffleArray = function (array) {
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

//}

/** Button **/
// {

var Button = function (x, y, w, h, txt, func) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
    this.func = func;
    this.mouseOver = false;
    this.arc = 180;
    
    this.draw = function () {
        
        this.mouseOver = dist(mouseX, mouseY, this.x, this.y) < this.w / 2;
        
        if (this.mouseOver) {
            this.arc = lerp(this.arc, 0, 0.1);
            if (clicked) {
                this.func();
            }
        }
        else {
            this.arc = lerp(this.arc, 180, 0.1);
        }
        
        noStroke();
        
        image(images.customCursor, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        
        fill(0);
        textFont(createFont("Sans Serif Bold"));
        textAlign(CENTER, CENTER);
        text(this.txt, this.x, this.y);
        
        fill(0, 0, 0, 30);
        arc(this.x, this.y, this.w, this.h, 0, this.arc);
        arc(this.x, this.y, this.w, this.h, 180, 180 + this.arc);
        
    };
};

var confirm = new Button(200, 200, 75, 75, "Confirm", function () {});

//}

/** Draw and mouseClicked funcitons **/
// {

draw = function () {
    try {
        
    cursor("none");
    
    if (!loaded) {
        load();
    }
    else {
        switch (scene) {
            case "menu" :
                //image(images.menu, 0, 0);
            break;
            case "game" : 
                image(images.gameBoard, 0, 0);
                
                for (var i in team1) {
                    team1[i].canMove = (playerTurn === 0 ? true : false);
                    
                    team1[i].draw();
                    if (team1[i].inPlay) {
                        team1[i].move();
                    }
                }
                for (var i in team2) {
                    team2[i].canMove = (playerTurn === 1 ? true : false);
                    
                    team2[i].draw();
                    if (team2[i].inPlay) {
                        team2[i].move();
                    }
                }
                for (var i in team3) {
                    team3[i].canMove = (playerTurn === 2 ? true : false);
                    
                    team3[i].draw();
                    if (team3[i].inPlay) {
                        team3[i].move();
                    }
                }
                for (var i in team4) {
                    team4[i].canMove = (playerTurn === 3 ? true : false);
                    
                    team4[i].draw();
                    if (team4[i].inPlay) {
                        team4[i].move();
                    }
                }
                
                for (var i in  discardDeck) {
                    discardDeck[i].draw();
                }
                for (var i in drawDeck) {
                    drawDeck[i].draw();
                }
                
                var curCard = drawDeck[drawDeck.length - 1];
                
                if (turnPhase === "draw") {
                    curCard.drawFromDeck();
                }
                
                if (turnPhase === "move") {
                    
                    if (selectedPlayer !== null && selectedPlayer.canMove) {
                        
                        if (playerTurn === 0) {
                            confirm.x = 325;
                            confirm.y = 110;
                        }
                        else if (playerTurn === 1) {
                            confirm.x = 690;
                            confirm.y = 325;
                        }
                        else if (playerTurn === 2) {
                            confirm.x = 475;
                            confirm.y = 690;
                        }
                        else if (playerTurn === 3) {
                            confirm.x = 110;
                            confirm.y = 475;
                        }
                        
                        confirm.draw();
                    }
                    
                    confirm.func = function () {
                        if (!action && selectedPlayer.canMove) {
                            if (!selectedPlayer.inPlay && curCard.card.value !== 1 && curCard.card.value !== 2) {
                                return;
                            }
                            else {
                                curCard.move(selectedPlayer);
                                if (spaces[selectedPlayer.targetSpace].occupied) {
                                    spaces[selectedPlayer.targetSpace].occupier.dead = true;
                                }
                                action = true;
                                spaces[selectedPlayer.curSpace].occupied = false;
                                spaces[selectedPlayer.curSpace].occupier = null;
                                spaces[selectedPlayer.targetSpace].occupied = true;
                                spaces[selectedPlayer.targetSpace].occupier = selectedPlayer;
                            }
                        }
                    };
                    
                    if (!teams[playerTurn][0].inPlay && !teams[playerTurn][1].inPlay && !teams[playerTurn][2].inPlay && !teams[playerTurn][3].inPlay && curCard.card.value !== 1 && curCard.card.value !== 2) {
                        action = true;
                    }
                    
                    if (action) {
                        actionTimer++;
                        curCard.discard();
                        if (actionTimer > 80) {
                            selectedPlayer = null;
                            if (clicked) {
                                actionTimer = 0;
                                action = false;
                                discardDeck.push(curCard);
                                drawDeck.pop();
                                playerTurn++;
                                if (playerTurn > 3) {
                                    playerTurn = 0;
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
                
                cursorR += 5;
                pushMatrix();
                    translate(mouseX, mouseY);
                    rotate(cursorR);
                    scale(0.15);
                    image(images.customCursor, -80, -80);
                popMatrix();
                
                textAlign(BASELINE);
                fill(0);
                textSize(15);
                text("Current player: ", 15, 20);
                curPlayerTxt = playerTurn === 0 ? [color(0, 175, 0), "GREEN"] : (playerTurn === 1 ? [color(200, 0, 0), "RED"] : (playerTurn === 2 ? [color(0, 130, 255), "BLUE"] : [color(237, 198, 0), "YELLOW"]));
                fill(curPlayerTxt[0]);
                text(curPlayerTxt[1], 125, 20);
            break;
        }
    }
    
    nextPhase.pack();
    clicked = false;
    
    fill(0);
    textSize(15);
    textAlign(BASELINE);
    outlinedText("FPS: " + ~~this.__frameRate, 10, 785, 2, color(255), color(0));
    
    }
    catch (e) {
        println(e);
    }
};

mouseClicked = function () {
    clicked = true;
};

//}

