export class UserInput {
    static init() {
        if (!this._instance) {
            this._instance = new UserInput();
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("UserInput not initialized. Call UserInput.init() first.");
        }
        return this._instance;
    }
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mousePressed = false;
        this.mouseClicked = false;
        this.keys = {};
        this.attachMouseListeners();
        this.attachKeyboardListeners();
    }
    attachMouseListeners() {
        const canvas = document.getElementById("canvas");
        canvas.addEventListener("mousedown", () => {
            this.mousePressed = true;
        });
        canvas.addEventListener("mouseup", () => {
            this.mousePressed = false;
            this.mouseClicked = true;
        });
        canvas.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        canvas.addEventListener("contextmenu", (e) => {
            // e.preventDefault(); // optional
        });
    }
    attachKeyboardListeners() {
        document.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        document.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    update() {
        this.mouseClicked = false;
    }
}
UserInput._instance = null;
