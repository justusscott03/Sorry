import { background } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.3/colors.js";

export class SceneManager {
    private static _instance: SceneManager;

    static get Instance() {
        return this._instance ??= new SceneManager();
    }

    scenes: Map<string, () => void> = new Map();

    currentScene: string = "load";

    registerScene(name: string, scene: () => void) {
        this.scenes.set(name, scene);
    }

    setCurrentScene(name: string) {
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