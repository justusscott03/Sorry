export class UserInput {
    private static _instance: UserInput | null = null;

    static init(): UserInput {
        if (!this._instance) {
            this._instance = new UserInput();
        }
        return this._instance;
    }

    static get Instance(): UserInput {
        if (!this._instance) {
            throw new Error("UserInput not initialized. Call UserInput.init() first.");
        }
        return this._instance;
    }

    mouseX = 0;
    mouseY = 0;
    mousePressed = false;
    mouseClicked = false;

    keys: Record<string, boolean> = {};

    private constructor() {
        this.attachMouseListeners();
        this.attachKeyboardListeners();
    }

    private attachMouseListeners() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;

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

    private attachKeyboardListeners() {
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