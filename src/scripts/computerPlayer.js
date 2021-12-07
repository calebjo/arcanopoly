import { Player } from "./player";

export class ComputerPlayer {
    constructor(startingGold, turnId, name, sprite) {
        super(startingGold, turnId, name, sprite)
        this.currentSquare = 0; // Start at the tavern;
        this.diceNum = 2;
        this.diceMax = 6;
        this.tavernMod = 1;
        this.rerolls = 0;
        this.properties = [];
        this.hand = [];
        this.equipment = [];
        this.bankrupt = false;
        this.buildPlayerEle(startingGold, turnId, name, sprite);
    }

    pressButton() {

    }

    buyProperty() {

    }

    playCard() {

    }
}