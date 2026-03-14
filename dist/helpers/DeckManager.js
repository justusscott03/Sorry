import { Card } from "../entities/Card.js";
import { cardData } from "../data/CardData.js";
export class DeckManager {
    constructor() {
        this.drawDeck = [];
        this.discardDeck = [];
        this.buildDeck();
        this.shuffle(this.drawDeck);
    }
    static get Instance() {
        if (!this._instance) {
            this._instance = new DeckManager();
        }
        return this._instance;
    }
    buildDeck() {
        for (let i = 0; i < cardData.length; i++) {
            for (let j = 0; j < cardData[i].quantity; j++) {
                this.drawDeck.push(new Card(407, 365, 200, 300, cardData[i]));
            }
        }
    }
    shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            const ind = Math.floor(Math.random() * counter);
            counter--;
            const temp = array[counter];
            array[counter] = array[ind];
            array[ind] = temp;
        }
    }
    drawCard() {
        if (this.drawDeck.length === 0) {
            this.reshuffle();
        }
        return this.drawDeck[this.drawDeck.length - 1];
    }
    popCard() {
        return this.drawDeck.pop();
    }
    discard(card) {
        this.discardDeck.push(card);
    }
    reshuffle() {
        this.drawDeck.push(...this.discardDeck);
        this.discardDeck.length = 0;
        this.shuffle(this.drawDeck);
    }
    renderCards() {
        this.discardDeck.forEach(card => card.draw());
        this.drawDeck.forEach(card => card.draw());
    }
}
