import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";
export class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.currentScene = "load";
    }
    static get Instance() {
        var _a;
        return (_a = this._instance) !== null && _a !== void 0 ? _a : (this._instance = new SceneManager());
    }
    registerScene(name, scene) {
        this.scenes.set(name, scene);
    }
    setCurrentScene(name) {
        if (this.scenes.has(name)) {
            this.currentScene = name;
        }
        else {
            console.error(`Scene "${name}" does not exist.`);
        }
    }
    renderCurrentScene() {
        background(255, 255, 255, 255);
        const sceneFunc = this.scenes.get(this.currentScene);
        if (sceneFunc) {
            sceneFunc();
        }
        else {
            console.warn(`No render function found for scene: ${this.currentScene}`);
        }
    }
}
