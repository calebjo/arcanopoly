import { Player } from "./player"
// all cards have an id, rarity, and price
// each card will also have a play() method, which can be invoked on the owner's turn

// -----------------------------------------------------------------------------------
// Parent class
export class Card {
    constructor(name, id, owner, rarity, price) {
        this.name = name
        this.id = id
        this.owner = owner
        this.rarity = rarity
        this.price = price
    }
}
// -----------------------------------------------------------------------------------
// Subclasses related to common functionality

export class MoneyCard extends Card {
    // cards that add or subtract gold from 1 or more targets
    constructor(name, id, owner, rarity, price, moneyDiff, moneyMod, ...targetPlayers){
        super(name, id, owner, rarity, price)
        this.moneyDiff = moneyDiff
        this.moneyMod = moneyMod
        this.targetPlayers = targetPlayers
    }

    // apply the money change to each target
    play(){
        for (let i = 0; i < this.targetPlayers.length; i++){
            this.targetPlayers[i].moneyChange(this.moneyDiff * this.moneyMod)
        }
    }
}

export class PropertyCard extends Card {
    // cards that give or take properties from players
    constructor(name, id, owner, rarity, price, propertyTarget, ...targetPlayers){
        super(name, id, owner, rarity, price)
        this.propertyTarget = propertyTarget
        this.targetPlayers = targetPlayers
    }

    play(){
        for (let i = 0; i < this.targetPlayers.length; i++){
            this.targetPlayers[i].moneyChange(this.moneyDiff * this.moneyMod)
        }
    }
}

export class MovementCard extends Card {
    // cards that move the target to a certain square (including self)
    constructor(name, id, owner, rarity, price, targetSquare, targetPlayer){
        super(name, id, owner, rarity, price)
        this.targetSquare = targetSquare
        this.targetPlayer = targetPlayer
    }
}

export class ModifierCard extends Card {
    // cards that modify an existing stat, like the rent of properties
    constructor(name, id, owner, rarity, price, targetStat, modifier, timer){
        super(name, id, owner, rarity, price)
        this.targetStat = targetStat
        this.modifier = modifier
        this.timer = timer
    }
}
// -----------------------------------------------------------------------------------
// Specific Card classes
export class BalanceCard extends Card {
    constructor(name, id, owner, rarity, price){
        super(name, id, owner, rarity, price)
    }

}